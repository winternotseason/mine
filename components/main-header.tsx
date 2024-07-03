"use client";

import Image from "next/image";
import classes from "./main-header.module.css";
import SearchInput from "./search-input";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import PcNav from "./pc-nav";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { PiUserPlusThin } from "react-icons/pi";

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
        <Link href="/">
          {isPC ? (
            <div className={classes.header_left}>
              <p className={classes.header_logo}>MINE</p>
            </div>
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
              <button>
                <CiSearch size={25} />
              </button>
            </form>
          </div>
        )}
        <div className={classes.header_right}>
          <Link href="/basket">
            <div className={classes.rightContent}>
              <PiUserPlusThin size={35} />
              <p>회원가입</p>
            </div>
          </Link>
          <Link href="/basket">
            <div className={classes.rightContent}>
              <CiLogin size={35} />
              <p>로그인</p>
            </div>
          </Link>
          <Link href="/basket" className={classes.rightContent}>
            <div className={classes.rightContent}>
              <PiShoppingCartSimpleThin size={35} />
              <p>장바구니</p>
            </div>
          </Link>
        </div>
      </div>
      {isPC && <PcNav />}
    </header>
  );
};

export default MainHeader;
