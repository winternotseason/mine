"use client";

import classes from "./main-header.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { PiUserPlusThin } from "react-icons/pi";

import { PiQuestionThin } from "react-icons/pi";

const MainHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  return (
    <header className={`${classes.header}`}>
      <div className={classes.header_top}>
        <div className={classes.header_left}>
          <Link href="/">
            <p className={classes.header_logo}>MINE</p>
          </Link>
        </div>
        <div className={classes.search}>
          <form
            action={() => {
              redirect(`${process.env.NEXT_PUBLIC_URL}search/${inputValue}`);
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
          {/* 모바일 환경에서 보일 search ICON */}
          <div className={classes.mobileModal}>
            <CiSearch
              size={25}
              onClick={() => {
                setSearchModal(true);
              }}
            />
          </div>
          {/* 세션 유저가 존재하면 로그아웃 버튼, 아니면 회원가입, 로그인 버튼 */}

          <>
            <div className={classes.rightItem}>
              <Link className={classes.logoutBtn} href="/service">
                <PiQuestionThin size={35} />
                <p>고객센터</p>
              </Link>
            </div>
            <div className={classes.rightItem}>
              <Link href="/join">
                <PiUserPlusThin size={35} />
                <p>회원가입</p>
              </Link>
            </div>
            <div className={classes.rightItem}>
              <Link href="/login" className={classes.flex}>
                <CiLogin size={35} />
                <p>로그인</p>
              </Link>{" "}
            </div>
          </>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
