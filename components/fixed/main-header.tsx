"use client";

import classes from "./main-header.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { PiUserPlusThin } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import NavInHeader from "./nav-in-header";
import MobileSearchModal from "../mobile-search-modal";

const MainHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const { data, status } = useSession();

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
          {data?.user ? (
            <>
              <div className={classes.rightItem}></div>
              <div className={classes.rightItem}>
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
          )}

          <div className={classes.rightItem}>
            <Link href="/basket">
              <PiShoppingCartSimpleThin size={35} />
              <p>장바구니</p>
            </Link>{" "}
          </div>
        </div>
      </div>
      <NavInHeader />
      {searchModal && <MobileSearchModal setSearchModal={setSearchModal} />}
    </header>
  );
};

export default MainHeader;
