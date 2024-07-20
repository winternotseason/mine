"use client";

import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
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
        isBottom={false}
        register={register}
      />

      <FormInput
        icon="lock"
        name="password"
        type="password"
        placeholder="비밀번호"
        isBottom={true}
        register={register}
      />

      <p>
        <SubmitButton text="로그인" />
      </p>
      {errors.id?.message && <p>{errors.id?.message}</p>}
      {errors.password?.message && <p>{errors.password?.message}</p>}
    </form>
  );
};

export default LoginForm;
