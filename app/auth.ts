import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { verifyPassword } from "@/lib/hash";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
  trustHost: true,
  providers: [
    Credentials({
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
          return null;
        }
        const isMatchPassword = await verifyPassword(user.password, password);
        if (!isMatchPassword) {
          return null;
        }

        // Any object returned will be saved in `user` property of the JWT
        return { email: user.id, name: user.name, ...user };
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
