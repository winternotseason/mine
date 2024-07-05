"use server";

import { signIn } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signup = async (
  prevData: { message: string | null },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const password_confirm = formData.get("password-confirm") as string;
  if (id.length < 5) {
    return { message: "아이디는 5자 이상 입력해주세요." };
  }
  if (password.length < 8) {
    return { message: "비밀번호는 8자 이상 입력해주세요." };
  }
  if (password !== password_confirm) {
    return { message: "비밀번호가 서로 다릅니다." };
  }
  let success;
  try {
    /* 이름 아이디 패스워드를 body에 담아서 보냄 */
    const res = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, password }),
    });
    const result = await res.json();
    console.log(result.status, result.message);
    if (result.status === 201) {
      success = true;
    } else {
      return { message: result.message };
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/login");
};

export const login = async (
  prevData: { message: string | null },
  formData: FormData
) => {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  let success;
  try {
    const res = await signIn("credentials", {
      username: id,
      password,
      redirect: false,
    });
    success = true;
  } catch (err) {
    console.log(err);
  }
  if (success) {
    revalidatePath("/", "layout");
    redirect("/");
  }
  return { message: "hi" };
};
