import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import { verifyPassword } from "@/lib/hash";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  callbacks: {
    // jwt 콜백함수는 로그인 성공, 클라이언트가 session에 접근 시 실행 됨.
    jwt({ token, account, profile }) {
      return token;
    },
    session({ session, token }) {
      if (session && token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const client = await connectDB();
        const db = client.db("mine");
        // 아이디가 DB에 존재 하는지?
        const user = await db.collection("users").findOne({ id: username });
        if (!user) {
          return null;
        }
        // 존재하면 비밀번호가 맞는지?
        const isMatchPassword = await verifyPassword(user.password, password);
        if (!isMatchPassword) {
          return null;
        }

        return { id: user.id, name: user.name, ...user };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
