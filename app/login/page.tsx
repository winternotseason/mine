import Image from "next/image";
import classes from "./page.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

const LoginPage = () => {
  return (
    <div className={classes.container}>
      <Image src="/mine-logo-l.png" alt="logo" width={180} height={54.15} />
      <form className={classes.loginbox}>
        <div className={classes.login}>
          <IoPersonOutline color="#9f9f9f"/>
          <input />
        </div>
        <div className={classes.password}>
        <CiLock color="#9f9f9f"/>
          <input />
        </div>
        <p>
          <button>로그인</button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
