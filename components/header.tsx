import Image from "next/image";
import classes from "./header.module.css";
import { FaShoppingBasket } from "react-icons/fa";
const Header = () => {
  return (
    <header className={classes.header}>
      <Image
        src="/mine-logo.png"
        alt="mine logo"
        width={30}
        height={30}
        priority
      />
      <FaShoppingBasket size={30} color="#526DFE"/>
    </header>
  );
};

export default Header;
