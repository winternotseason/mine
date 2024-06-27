"use client";

import Image from "next/image";
import classes from "./main-header.module.css";
import { FaShoppingBasket } from "react-icons/fa";
import SearchInput from "./search-input";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MainHeader = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.input) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [params.input]);

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
      {isSearchPage && <SearchInput isMain={false}/>}
      <p>
        <FaShoppingBasket size={30} color="#526DFE" />
      </p>
    </header>
  );
};

export default MainHeader;
