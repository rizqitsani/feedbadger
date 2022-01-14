import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { prisma } from '@/lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async redirect() {
      return '/';
    },
  },
});
