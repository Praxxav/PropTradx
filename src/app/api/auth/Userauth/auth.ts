import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import type { User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/authdb/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
  }
}

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
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your full name" },
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        if (!credentials.name) {
          throw new Error("Name is required");
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return user;
        }

        if (!user.password) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.update({
            where: { email: credentials.email },
            data: { password: hashedPassword },
          });
        }

        const isValid = await bcrypt.compare(credentials.password, user.password!);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        } as User;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Only run this for OAuth providers (Google, GitHub)
      if (account?.provider && account.type === "oauth") {
        if (!user.email) {
          // Email is required to link accounts
          return false;
        }

        // Check if user already exists by email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Check if OAuth account is already linked
          const linkedAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          // If not linked, link the OAuth account to the existing user
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
        // Allow sign in in all cases here
        return true;
      }

      // For CredentialsProvider or others, just allow sign in
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.name = token.name ?? session.user.name ?? null;
        session.user.email = token.email ?? session.user.email ?? null;
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
