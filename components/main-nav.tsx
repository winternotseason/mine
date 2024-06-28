"use client";
import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import Link from "next/link";
import { verifyAuth } from "@/lib/db";
import { logout } from "@/actions/logout";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

const MainNav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginHandler = useAuthStore((state) => state.loginHandler);
  const logoutHandler = useAuthStore((state) => state.logoutHandler);

  useEffect(() => {
    const getVerifyAuth = async () => {
      const res = await verifyAuth();
      if (res.user) {
        loginHandler();
      } else {
        logoutHandler();
      }
    };
    getVerifyAuth();
  }, [loginHandler, logoutHandler]);
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
      {isAuthenticated ? (
        <form action={logout} className={classes.nav}>
          <button>
            <GoSignOut className={classes.icon} />
            <p>로그아웃</p>
          </button>
        </form>
      ) : (
        <Link href="/login">
          <div className={`${classes.nav} ${classes.login}`}>
            <GoSignIn className={classes.icon} />
            <p>로그인</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MainNav;
