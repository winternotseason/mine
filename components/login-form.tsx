"use client";

import classes from "./login-form.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useFormState } from "react-dom";
import { login } from "@/actions/user";

const LoginForm = () => {
  const [formState, formAction] = useFormState(login, { message: "" });
  return (
    <form className={classes.box} action={formAction}>
      <div className={classes.bordertop}>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input name="id" type="text" placeholder="아이디" />
      </div>
      <div className={classes.borderbottom}>
        <CiLock className={classes.icon} color="#9f9f9f" />
        <input name="password" type="password" placeholder="비밀번호" />
      </div>
      <p>
        <button>로그인</button>
      </p>
    </form>
  );
};

export default LoginForm;
