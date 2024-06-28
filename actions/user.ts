import { errorObj } from "@/lib/types";
import { signIn } from "next-auth/react";

export const signup = async (prevData: errorObj, formData: FormData) => {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const password_confirm = formData.get("password-confirm") as string;
  if (id.length < 5) {
    return { errors: "아이디는 5자 이상 입력해주세요." };
  }
  if (password.length < 8) {
    return { errors: "비밀번호는 8자 이상 입력해주세요." };
  }
  if (password !== password_confirm) {
    return { errors: "비밀번호가 서로 다릅니다." };
  }
  try {
    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, password }),
    });

    if (res.ok) {
      return { errors: "가입 완료" };
    }
    if (!res.ok) {
        return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (prevData: errorObj, formData: FormData) => {
   
    const id = formData.get("id") as string;
    const password = formData.get("password") as string;
    try {
        const res = await signIn("credentials", {
            id,password
        })
        if (res.error) {
            return {errors:res.error}
        }
    } catch (err) {
        console.log(err)
    }
    return {errors:'hi'}
  };