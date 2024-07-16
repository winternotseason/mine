"use server";

import { auth } from "@/app/auth";
import clientPromise from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const post = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let success = false;
  try {
    const session = await auth();
    const user = session.user.name;
    const id = session.user.email;
    const client = await clientPromise;
    const db = client.db("mine");
    const posts = db.collection("posts");
    await posts.insertOne({ user, title, content, id });
    success = true;
  } catch {}
  if (success) {
    revalidatePath("/service");
    redirect("/service");
  }
};

export const addReply = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const postid = formData.get("postid") as string;
  let success = false;
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const reply = db.collection("reply");
    await reply.insertOne({ post_id: postid, content });
    success = true;
  } catch {}

  if (success) {
    revalidatePath(`/service/${postid}`, "page");
    redirect(`/service`);
  }
};
