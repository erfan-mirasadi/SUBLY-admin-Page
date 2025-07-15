import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/services/apiAuth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { user, session } = await Login({
            email: credentials.email,
            password: credentials.password,
          });

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.email,
              accessToken: session?.access_token,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
