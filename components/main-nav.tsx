import classes from "./main-nav.module.css";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { PiUserSoundThin } from "react-icons/pi";
import { GoPerson } from "react-icons/go";

const MainNav = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.nav}>
        <GoPerson className={classes.icon}/>
        <p>마이페이지</p>
      </div>
      <div className={classes.nav}>
        <BiSolidShoppingBagAlt className={classes.icon}/>
        <p>쇼핑홈</p>
      </div>
      <div className={classes.nav}>
        <PiUserSoundThin className={classes.icon}/>
        <p>고객센터</p>
      </div>
    </div>
  );
};

export default MainNav;
