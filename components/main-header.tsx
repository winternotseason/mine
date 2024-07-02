"use client";

import Image from "next/image";
import classes from "./main-header.module.css";
import { FaShoppingBasket } from "react-icons/fa";
import SearchInput from "./search-input";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import PcNav from "./pc-nav";

const MainHeader = () => {
  const isPC = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [inputValue, setInputValue] = useState("");
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
      <div className={classes.header_first}>
        <p>
          <Link href="/" className={classes.logo}>
            {isPC ? (
              <Image
                src="/mine-logo-l.png"
                alt="mine logo"
                fill
                priority
                className={classes.icon}
              />
            ) : (
              <Image
                src="/mine-logo.png"
                alt="mine logo"
                fill
                priority
                className={classes.icon}
              />
            )}
          </Link>
          <span>쇼핑</span>
        </p>
        {/* 검색 결과 페이지이면서 모바일 화면일때, isMain은 false가 된다.*/}
        {isSearchPage && <SearchInput isMain={false} />}
        {isPC && (
          <div className={classes.pc_search}>
            <form
              action={() => {
                redirect(`${process.env.NEXTAUTH_URL}search/${inputValue}`);
              }}
            >
              <input
                type="text"
                name="search-input"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </div>
        )}
        <p>
          <Link href="/basket" className={classes.icon}>
            <FaShoppingBasket color="#526DFE" />
          </Link>
        </p>
      </div>
      {isPC && <PcNav />}
    </header>
  );
};

export default MainHeader;
