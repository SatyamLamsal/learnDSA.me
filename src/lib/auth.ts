import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Temporarily disabled for OAuth stability
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token: _token }) {
      console.log('🔄 Session callback:', session?.user?.email);
      if (session?.user?.email) {
        // Manually sync user data with database
        try {
          const user = await prisma.user.upsert({
            where: { email: session.user.email },
            update: { 
              name: session.user.name,
              image: session.user.image,
            },
            create: {
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
            },
          });
          session.user.id = user.id;
          console.log('✅ User synced with database:', user.id);
        } catch (error) {
          console.error('❌ Database sync error:', error);
          // Continue without database ID - bookmarks won't work but auth will
        }
      }
      return session;
    },
    async signIn({ user, account, profile: _profile }) {
      console.log('🔐 SignIn callback:', user?.email, account?.provider);
      return true;
    },
    async jwt({ token, user, account: _account }) {
      console.log('🎯 JWT callback:', token?.email);
      // Store user info in token for session callback
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error('❌ NextAuth Error:', code, metadata);
    },
    warn(code) {
      console.warn('⚠️ NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.log('🐛 NextAuth Debug:', code, metadata);
    },
  },
  events: {
    async signIn({ user }) {
      console.log('✅ User signed in:', user.email);
    },
    async signOut() {
      console.log('👋 User signed out');
    },
  },
}