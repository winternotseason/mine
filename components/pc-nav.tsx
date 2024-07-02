import Link from "next/link";
import classes from "./pc-nav.module.css";

const PcNav = () => {
  return (
    <nav className={classes.pc_nav}>
      <ul>
        <Link href="/">
          <li>홈</li>
        </Link>
        <li>오늘행사</li>
        <li>쿠폰</li>
        <li>도착보장</li>
        <li>럭셔리</li>
        <li>리빙윈도</li>
        <li>도서</li>
        <li>핫아이템</li>
        <li>기획전</li>
      </ul>
    </nav>
  );
};

export default PcNav;
