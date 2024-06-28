"use server";

import { client } from "@/lib/db";
import { hashUserPassword } from "@/lib/hash";
import { errorObj } from "@/lib/types";
import { redirect } from "next/navigation";

export async function signup(
  prevData: errorObj | undefined | null,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password-confirm") as string;

  const connectedClient = await client.connect();
  const db = connectedClient.db("mine");
  const user = await db.collection("users").countDocuments({ id });
  // 1. 아이디가 데이터베이스에 존재하는 지 확인
  if (user > 0) {
    return { errors: "이미 존재하는 아이디입니다." };
  }
  // 2. 비밀번호가 8자 이상인지 확인
  if (password?.toString().trim().length < 8) {
    return { errors: "비밀번호는 8자 이상이어야합니다." };
  }
  // 3. 비밀번호가 맞는지 확인
  if (password !== passwordConfirm) {
    return { errors: "비밀번호가 서로 다릅니다." };
  }
  let success = false;
  // 유저 insert
  try {
    const hashedPassword = await hashUserPassword(password);
    await db.collection("users").insertOne({
      id,
      name,
      password: hashedPassword,
    });
    success = true;
  } catch {
  } finally {
    if (success) {
      redirect("/login");
    }
  }
}
