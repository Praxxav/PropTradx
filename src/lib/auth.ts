import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/authdb/prisma"; // Your Prisma client instance
import bcrypt from "bcryptjs";

// Extend the session user type to include an ID
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
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // Sign up new users if they don't exist
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return user;
        }

        // If the user exists but was created via OAuth (password is null)
        if (!user.password) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.update({
            where: { email: credentials.email },
            data: { password: hashedPassword },
          });
        }

        // Check if password is null before comparing
        if (!user.password) {
          throw new Error("This account does not have a password set. Please log in using Google/GitHub.");
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
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
  callbacks: {
    jwt: async ({ user, token }: { user?: User; token: JWT }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user) {
        session.user.id = token.uid as string;
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
