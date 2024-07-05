"use client";

import classes from "./main-header.module.css";
import SearchInput from "./search-input";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { PiUserPlusThin } from "react-icons/pi";
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const updateSession = async () => {
      await getSession();
    };
    updateSession();
  }, [session]);

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
        <div className={classes.header_left}>
          <Link href="/">
            <p className={classes.header_logo}>MINE</p>
          </Link>
        </div>

        <span>쇼핑</span>

        {/* 검색 결과 페이지이면서 모바일 화면일때, isMain은 false가 된다.*/}
        {isSearchPage && <SearchInput isMain={false} />}

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

        <div className={classes.header_right}>
          {session?.user ? (
            <>
              <div className={classes.rightContent}></div>
              <div className={classes.rightContent}>
                <button
                  className={classes.logoutBtn}
                  onClick={() => {
                    signOut({ redirect: false });
                  }}
                >
                  <CiLogin size={35} />
                  <p>로그아웃</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <section className={classes.rightContent}>
                <Link href="/join">
                  <PiUserPlusThin size={35} />
                  <p>회원가입</p>
                </Link>
              </section>
              <div className={classes.rightContent}>
                <Link href="/login" className={classes.flex}>
                  <CiLogin size={35} />
                  <p>로그인</p>
                </Link>{" "}
              </div>
            </>
          )}
          <div className={classes.rightContent}>
            <Link href="/basket">
              <PiShoppingCartSimpleThin size={35} />
              <p>장바구니</p>
            </Link>{" "}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
