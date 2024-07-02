"use client";

import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { TfiBackRight } from "react-icons/tfi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MainNav = () => {
  const router = useRouter();
  return (
    <div className={classes.footer}>
      <Link href="/">
        <div className={classes.nav}>
          <BiSolidShoppingBagAlt className={classes.icon} />
          <p>쇼핑홈</p>
        </div>
      </Link>
      <div
        className={classes.nav}
        onClick={() => {
          router.back();
        }}
      >
        <TfiBackRight className={classes.icon} />
        <p>뒤로가기</p>
      </div>
    </div>
  );
};

export default MainNav;
