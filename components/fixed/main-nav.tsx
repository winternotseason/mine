"use client";

import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { PiQuestionThin } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";

const MainNav = () => {
  const router = useRouter();

  return (
    <div className={classes.footer}>
      <div
        className={classes.nav}
        onClick={() => {
          router.push("/service");
        }}
      >
        <PiQuestionThin className={classes.icon} />
        <p>고객센터</p>
      </div>
      <Link href="/">
        <div className={classes.nav}>
          <BiSolidShoppingBagAlt className={classes.icon} />
          <p>쇼핑홈</p>
        </div>
      </Link>

      <Link href="/login">
        <div className={`${classes.nav} ${classes.login}`}>
          <CiLogin className={classes.icon} />
          <p>로그인</p>
        </div>
      </Link>
    </div>
  );
};

export default MainNav;
