"use client";

import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { errorMessage } from "./join-form";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const res = await signIn("credentials", {
        username: data.id,
        password: data.password,
        redirect: false,
      });

      if (res.error) {
        setMessage("아이디 또는 비밀번호가 다릅니다.");
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="w-80 mt-12 border-[1px] border-gray-300 p-6 rounded mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        icon="person"
        name="id"
        type="text"
        placeholder="아이디"
        register={register}
      />
      {errors.id?.message && (
        <p className={errorMessage}>{errors.id?.message}</p>
      )}
      <FormInput
        icon="lock"
        name="password"
        type="password"
        placeholder="비밀번호"
        register={register}
      />
      {errors.password?.message && (
        <p className={errorMessage}>{errors.password?.message}</p>
      )}
      {message.trim().length !== 0 && <p>{message}</p>}
      <p>
        <SubmitButton text="로그인" pending={isSubmitting} />
      </p>
    </form>
  );
};

export default LoginForm;
