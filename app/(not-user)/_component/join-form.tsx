"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "./SubmitButton";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetcher } from "@/lib/utils";
import AvatarSelection from "./AvatarSelection";

export const errorMessage = "text-sm text-center text-red-500";

export default function JoinForm() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<number>();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      const result = await fetcher(
        `${process.env.NEXT_PUBLIC_URL}api/register`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, selectedAvatar }),
        }
      );

      if (result.status === 201) {
        router.push("/login");
      } else {
        setMessage(result.message);
      }
    } catch {}
  };

  return (
    <form
      className="w-80 mt-12 border-[1px] border-gray-300 p-6 rounded mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AvatarSelection
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      <FormInput
        icon="person"
        type="text"
        placeholder="이름"
        name="name"
        register={register}
      />
      {errors.name?.message && (
        <p className={errorMessage}>{errors.name?.message}</p>
      )}
      <FormInput
        icon="person"
        type="text"
        placeholder="아이디"
        name="id"
        register={register}
      />
      {errors.id?.message && (
        <p className={errorMessage}>{errors.id?.message}</p>
      )}
      <FormInput
        icon="lock"
        type="password"
        placeholder="비밀번호"
        name="password"
        register={register}
      />
      {errors.password?.message && (
        <p className={errorMessage}>{errors.password?.message}</p>
      )}
      <FormInput
        icon="lock"
        type="password"
        placeholder="비밀번호확인"
        name="passwordConfirm"
        register={register}
      />

      {errors.passwordConfirm?.message && (
        <p className={errorMessage}>{errors.passwordConfirm?.message}</p>
      )}
      {message.trim().length !== 0 && <p>{message}</p>}
      <p>
        <SubmitButton text="가입하기" pending={isSubmitting}/>
      </p>
    </form>
  );
}
