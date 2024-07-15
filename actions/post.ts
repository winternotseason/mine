"use server";

import { auth } from "@/app/auth";
import clientPromise from "@/lib/db";
import { redirect } from "next/navigation";

export const post = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let success = false;
  try {
    const session = await auth();
    const user = session.user.name;
    const id = session.user.email
    const client = await clientPromise;
    const db = client.db("mine");
    const posts = db.collection("posts");
    await posts.insertOne({ user, title, content, id });
    success = true;
  } catch {}
  if (success) {
    redirect('/service');
  }
};
