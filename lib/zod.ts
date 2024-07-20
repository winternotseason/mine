import { z } from "zod";

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().nonempty("이름을 입력해주세요.").min(1),
    id: z
      .string()
      .nonempty("아이디를 입력해주세요.")
      .regex(/^[a-z0-9]{5,20}$/, "영어 소문자 + 숫자 5-20자 입력해주세요"),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        "영문+숫자+특수문자 조합 8~15자리를 입력해주세요."
      ),
    passwordConfirm: z.string().nonempty("비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const loginSchema = z.object({
  id: z.string().nonempty("아이디를 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
});
