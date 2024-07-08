import Link from "next/link";
import classes from "./pc-nav.module.css";

const PcNav = () => {
  return (
    <nav className={classes.pc_nav}>
      <ul>
        <Link href="/">
          <li>HOME</li>
        </Link>
        <li>TODAY</li>
        <li>COUPON</li>
        <li>LUXURY</li>
        <li>LIVING</li>
        <li className={classes.onPC}>FOOD</li>
        <li className={classes.onPC}>BOOK</li>
        <li className={classes.onPC}>HOT</li>
        <li className={classes.onPC}>EVENT</li>
      </ul>
    </nav>
  );
};

export default PcNav;
