// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/config/axios";
import { API_URLS } from "@/config/urls";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        const { data } = await api.post(API_URLS.login, {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (data?.status !== "success") {
          throw new Error(data?.message || "Login failed");
        }

        return {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          token: data.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
        (token as any).picture = (user as any).image;
        (token as any).accessToken = (user as any).token;
      }
      return token;
    },

    async session({ session, token }) {
      // վերադարձնում ենք session-ը type-safe ձևով
      return {
        ...session,
        user: {
          ...(session.user ?? {}),
          id: (token as any).id,
          name: token.name as any,
          email: token.email as any,
          image: (token as any).picture,
        },
        accessToken: (token as any).accessToken,
      } as any;
    },
  }
,
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
