"use client";

import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { TfiBackRight } from "react-icons/tfi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { CiLogin } from "react-icons/ci";

const MainNav = () => {
  const router = useRouter();
  const { data, status } = useSession();
  return (
    <div className={classes.footer}>
      <div className={classes.nav} onClick={()=>{
        router.back()
      }}>
        <TfiBackRight className={classes.icon} />
        <p>뒤로가기</p>
      </div>
      <Link href="/">
        <div className={classes.nav}>
          <BiSolidShoppingBagAlt className={classes.icon} />
          <p>쇼핑홈</p>
        </div>
      </Link>
      {data?.user ? (
        <div
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
          className={`${classes.nav} ${classes.login}`}
        >
          <CiLogin className={classes.icon} />
          <p>로그아웃</p>
        </div>
      ) : (
        <Link href="/login">
          <div className={`${classes.nav} ${classes.login}`}>
            <CiLogin className={classes.icon} />
            <p>로그인</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MainNav;
