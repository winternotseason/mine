"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "./SubmitButton";
import FormInput from "./FormInput";

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-80 mt-12 border-[1px] border-gray-300 p-6 rounded mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        icon="person"
        type="text"
        placeholder="이름"
        name="name"
        isBottom={false}
        register={register}
      />

      {errors.name?.message && <p>{errors.name?.message}</p>}

      <FormInput
        icon="person"
        type="text"
        placeholder="아이디"
        name="id"
        isBottom={false}
        register={register}
      />

      {errors.id?.message && <p>{errors.id?.message}</p>}

      <FormInput
        icon="lock"
        type="password"
        placeholder="비밀번호"
        name="password"
        isBottom={false}
        register={register}
      />
      {errors.password?.message && <p>{errors.password?.message}</p>}

      <FormInput
        icon="lock"
        type="password"
        placeholder="비밀번호확인"
        name="passwordConfirm"
        isBottom={true}
        register={register}
      />
      {errors.passwordConfirm?.message && (
        <p>{errors.passwordConfirm?.message}</p>
      )}

      <p>
        <SubmitButton text="가입하기" />
      </p>
    </form>
  );
}
