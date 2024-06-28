import classes from "./login-form.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
const LoginForm = () => {
  return (
    <form className={classes.box}>
      <div className={classes.bordertop}>
        <IoPersonOutline className={classes.icon} color="#9f9f9f" />
        <input placeholder="아이디" />
      </div>
      <div className={classes.borderbottom}>
        <CiLock className={classes.icon} color="#9f9f9f" />
        <input placeholder="비밀번호" />
      </div>
      <p>
        <button>로그인</button>
      </p>
    </form>
  );
};

export default LoginForm;
