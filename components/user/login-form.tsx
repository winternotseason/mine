"use client";

import classes from "./login-form.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      console.log(res)
      if (res.error) {
        setMessage("아이디 또는 비밀번호가 다릅니다.");
      } else {
        router.replace("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className={classes.box} onSubmit={onSubmit}>
      <div className={classes.bordertop}>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input
          name="id"
          type="text"
          placeholder="아이디"
          onChange={(e) => {
            setId(e.target.value);
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
            setPassword(e.target.value);
          }}
        />
      </div>
      {message.trim().length !== 0 && (
        <p className={classes.message}>{message}</p>
      )}
      <p>
        <button>로그인</button>
      </p>
    </form>
  );
};

export default LoginForm;
