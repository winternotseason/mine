"use client";

import React, { useState } from "react";
import { RiMenuSearchLine } from "react-icons/ri";
import SideMenu from "./SideMenu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* 모바일 헤더 */}
      <div className="relative md:hidden ">
        <div className="fixed z-10 w-full bg-white top-0 right-0 px-4 py-5 flex justify-between  items-center backdrop-blur-sm">
          <div
            className="relative cursor-pointer flex items-center text-2xl"
            onClick={() => {
              router.replace("/");
            }}
          >
            <p className="text-green-500 font-bold">#</p>
            <p className="font-bold">MINE</p>
          </div>
          <RiMenuSearchLine
            size={25}
            onClick={toggleSearch}
            className="cursor-pointer"
          />
        </div>

        {/* 사이드 아코디언 메뉴 */}
        <SideMenu
          setIsSearchOpen={setIsSearchOpen}
          isSearchOpen={isSearchOpen}
        />
      </div>
      {/* 데스크탑 / 태블릿 헤더 */}
      <div className="w-full bg-white hidden md:block lg:block">
        <div className="flex py-10 px-8 justify-between items-center">
          <Link href="/">
            <div className="flex font-bold text-2xl">
              <p className="text-green-500">#</p>MINE{" "}
            </div>
          </Link>
          <div className="grow flex justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/search/${searchQuery}`);
                setSearchQuery("");
              }}
              className="w-full max-w-[35rem] rounded-3xl overflow-hidden shadow-md"
            >
              <input
                type="text"
                className="w-full px-5 py-2 outline-none bg-inherit"
                placeholder="🔍 상호명으로 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          {session?.user ? (
            <div className="flex items-center">
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-white px-3 text-sm"
              >
                로그아웃
              </button>
              <Link
                href={`/${session.user.id}`}
                className="bg-white px-3 text-sm"
              >
                마이페이지
              </Link>
            </div>
          ) : (
            <div className="flex space-x-2 items-center">
              <Link
                href="/login"
                className="text-white bg-green-500 px-4 py-2 rounded-3xl text-sm"
              >
                로그인
              </Link>
              <Link href="/join" className="bg-white px-3 text-sm">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
