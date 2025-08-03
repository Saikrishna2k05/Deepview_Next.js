import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"



export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials:{
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string ;
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) return null;
        const isValid = await compare(password, user.password as string);
        if (!isValid) return null;
        return user;
      }
    }),
    Google
  ],
callbacks: {
  async jwt({ token, user }) {
    if(user)
    {
    token.id=user.id
    token.image=user.image;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.image = token.image as string; 
    }
    return session;
  }
}
})