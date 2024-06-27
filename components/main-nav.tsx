import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { GoSignIn } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import Link from "next/link";

const MainNav = () => {
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
      <div className={classes.nav}>
        <GoSignIn className={classes.icon} />
        <p>로그인</p>
      </div>
    </div>
  );
};

export default MainNav;
