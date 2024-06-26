import Image from "next/image";
import classes from "./header.module.css";
import { FaShoppingBasket } from "react-icons/fa";


const Header = () => {
  return (
    <header className={`${classes.header}`}>
      <p>
        <Image
          src="/mine-logo.png"
          alt="mine logo"
          width={30}
          height={30}
          priority
        />
        <span>쇼핑</span>
      </p>
      <p>
        <FaShoppingBasket size={30} color="#526DFE" />
      </p>
    </header>
  );
};

export default Header;
