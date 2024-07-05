import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { verifyPassword } from "@/lib/hash";
import type { NextAuthConfig } from "next-auth";

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const client = await clientPromise;
        const db = client.db("mine");
        const user = await db.collection("users").findOne({ id: username });

        if (!user) {
          console.log("유저가 존재하지 않습니다");
          return null;
        }
        const isMatchPassword = await verifyPassword(user.password, password);
        if (!isMatchPassword) {
          console.log("비밀번호가 다릅니다.");
          return null;
        }
        console.log("로그인 성공!");
        console.log("login로직:", user);
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
  adapter: MongoDBAdapter(clientPromise),
});
