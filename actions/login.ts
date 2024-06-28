"use server";

import { client, createAuthSession } from "@/lib/db";
import { verifyPassword } from "@/lib/hash";
import { errorObj } from "@/lib/types";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function login(
  prevData: errorObj | undefined | null,
  formData: FormData
) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const connectedClient = await client.connect();
  const db = connectedClient.db("mine");
  const user = await db.collection("users").countDocuments({ _id:id });
  if (user === 0) {
    return { errors: "존재하지 않는 이메일입니다." };
  }

  const userData = await db.collection("users").findOne({ _id: id });
  const isValidPassword = await verifyPassword(userData.password, password);
  if (!isValidPassword) {
    return { errors: "비밀번호가 맞지 않습니다." };
  }
  await createAuthSession(userData._id);
  redirect("/");
}
