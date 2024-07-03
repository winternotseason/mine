"use client";

import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { TfiBackRight } from "react-icons/tfi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { signOut } from "next-auth/react";

const MainNav = () => {
  const router = useRouter();
  return (
    <div className={classes.footer}>
      <div className={classes.nav}>
        <GoPerson className={classes.icon} />
        <p>마이페이지</p>
      </div>
      <Link href="/">
        <div className={classes.nav}>
          <BiSolidShoppingBagAlt className={classes.icon} />
          <p>쇼핑홈</p>
        </div>
      </Link>
      <Link href="/login">
        <div className={`${classes.nav} ${classes.login}`}>
          <GoSignIn className={classes.icon} />
          <p>로그인</p>
        </div>
      </Link>
      <div
        onClick={() => {
          signOut({ redirect: false }).then(() => {
            router.push("/");
          });
        }}
        className={`${classes.nav} ${classes.login}`}
      >
        <GoSignIn className={classes.icon} />
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default MainNav;
