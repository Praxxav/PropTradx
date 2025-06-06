import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import { SignJWT, importJWK } from 'jose';
import { randomUUID } from 'crypto';

import type { User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/authdb/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    token?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      jwtToken?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    jwtToken?: string;
  }
}

// Generate JWT manually
const generateJWT = async (payload: Record<string, any>) => {
  const secret = process.env.JWT_SECRET || 'secret';
  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .setJti(randomUUID())
    .sign(jwk);
};

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your full name" },
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        const { email, password, name } = credentials ?? {};
        if (!email || !password) throw new Error("Missing email or password");

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await prisma.user.create({
            data: { name: name ?? "", email, password: hashedPassword },
          });
        }

        if (!user.password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
          });
        }

        const isValid = await bcrypt.compare(password, user.password!);
        if (!isValid) throw new Error("Invalid password");

        const jwtToken = await generateJWT({ id: user.id, email: user.email });
        await prisma.user.update({
          where: { id: user.id },
          data: { token: jwtToken },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token: jwtToken,
        } as User;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (!user.email) return false;

        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

        if (existingUser) {
          const linkedAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (!linkedAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.jwtToken = (user as any).token ?? "";
      } else if (token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.jwtToken = dbUser.token ?? "";
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.name = token.name ?? session.user.name ?? null;
        session.user.email = token.email ?? session.user.email ?? null;
        session.user.jwtToken = token.jwtToken ?? "";
        session.user.role = process.env.ADMINS?.split(',').includes(token.email ?? "") ? 'admin' : 'user';
      }
      return session;
    },
  },

  pages: {
    signIn: "/dashboard",
  },

  debug: process.env.NODE_ENV === "development",
};

export default NEXT_AUTH_CONFIG;
