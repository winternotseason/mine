"use client";

import classes from "./join-form.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useFormState } from "react-dom";
import { signup } from "@/actions/user";

const JoinForm = () => {
  const [formState, formAction] = useFormState(signup, { message: "" });
  // signup 함수에 name, id, password, password-confirm 받아서 보냄
  return (
    <form className={classes.box} action={formAction}>
      <div className={classes.bordertop}>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input type="text" name="name" placeholder="이름" />
      </div>
      <div>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input type="text" name="id" placeholder="아이디" />
      </div>
      <div>
        <CiLock className={classes.icon} color="#9f9f9f" />
        <input type="password" name="password" placeholder="비밀번호" />
      </div>
      <div className={classes.borderbottom}>
        <CiLock className={classes.icon} color="#9f9f9f" />
        <input
          type="password"
          name="password-confirm"
          placeholder="비밀번호 확인"
        />
      </div>
      <p className={classes.message}>{formState.message && formState.message}</p>
      <p>
        <button>가입하기</button>
      </p>
    </form>
  );
};

export default JoinForm;
