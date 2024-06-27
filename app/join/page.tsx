import Image from "next/image";
import classes from "./page.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Link from "next/link";

const JoinPage = () => {
  return (
    <div className={classes.container}>
      <Image src="/mine-logo-l.png" alt="logo" width={180} height={54.15} />
      <form className={classes.loginbox}>
        <div className={classes.bordertop}>
          <IoPersonOutline className={classes.icon} color="#9f9f9f" />
          <input placeholder="이름" />
        </div>
        <div>
          <IoPersonOutline className={classes.icon} color="#9f9f9f" />
          <input placeholder="아이디" />
        </div>
        <div>
          <CiLock className={classes.icon} color="#9f9f9f" />
          <input placeholder="비밀번호" />
        </div>
        <div className={classes.borderbottom}>
          <CiLock className={classes.icon} color="#9f9f9f" />
          <input placeholder="비밀번호 확인" />
        </div>
        <p>
          <button>가입하기</button>
        </p>
      </form>
    </div>
  );
};

export default JoinPage;
