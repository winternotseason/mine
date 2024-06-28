import { connectDB } from "@/lib/db";
import { verifyPassword } from "@/lib/hash";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { id, password } = credentials as {
          id: string;
          password: string;
        };

        const client = await connectDB();
        const db = client.db("mine");
        const user = await db.collection("users").findOne({ id });

        if (!user) {
          console.log("유저잇음?");
          return null;
        }

        const isMatchPassword = await verifyPassword(user.password, password);
        if (!isMatchPassword) {
          console.log("비번 틀림");
          return null;
        }
        console.log('비번맞음?')
        return { id, password };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
