import Image from "next/image";
import classes from "./page.module.css";
import Link from "next/link";
import LoginForm from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className={classes.container}>
      <h1>MINE</h1>
      <LoginForm />
      <Link href="/join">
        <p className={classes.join}>회원가입</p>
      </Link>
    </div>
  );
};

export default LoginPage;
