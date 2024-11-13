import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './db';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export const authOptions: NextAuthConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  experimental: { enableWebAuthn: true },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const userExists = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      if (userExists) return true;

      // Create user if it doesn't exist
      await prisma.user.create({
        data: {
          name: user.name!,
          email: user.email!,
          image: user.image!,
        },
      });
      return true;
    },
    session: async ({ session, token }) => {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // Fetch user ID from the database if not directly available in the user object
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authOptions);
