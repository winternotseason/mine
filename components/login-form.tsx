"use client";

import classes from "./login-form.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      id: userInfo.id,
      password: userInfo.password,
      redirect : false
    });
    if(res.ok){
      router.push('/')
    }
  };
  return (
    <form className={classes.box} onSubmit={handleSubmit}>
      <div className={classes.bordertop}>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input
          name="id"
          type="text"
          placeholder="아이디"
          onChange={(e) => {
            setUserInfo({ ...userInfo, id: e.target.value });
          }}
        />
      </div>
      <div className={classes.borderbottom}>
        <CiLock className={classes.icon} color="#9f9f9f" />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
      </div>
      <p>
        <button>로그인</button>
      </p>
    </form>
  );
};

export default LoginForm;
