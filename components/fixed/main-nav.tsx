"use client";

import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { PiQuestionThin } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { useSession } from "next-auth/react";

const MainNav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
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
      <Link href="/main">
        <div className={classes.nav}>
          <BiSolidShoppingBagAlt className={classes.icon} />
          <p>쇼핑홈</p>
        </div>
      </Link>

      <Link href={`/${session?.user?.id}`}>
        <div className={`${classes.nav} ${classes.login}`}>
          <CiLogin className={classes.icon} />
          <p>마이페이지</p>
        </div>
      </Link>
    </div>
  );
};

export default MainNav;
