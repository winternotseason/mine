"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const SideMenu = ({ isSearchOpen, setIsSearchOpen }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      {/* 백드롭 */}
      {isSearchOpen && (
        <div className="fixed top-[63px] left-0 w-full h-full bg-black/40 z-40" />
      )}
      <div
        className={`fixed z-50 w-2/3 md:w-1/2 top-[63px] right-0 h-full bg-white transition-transform duration-300 ease-in-out ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* 회원 여부 */}
          <div className="w-full h-40 bg-black/5  text-black">
            <div className="p-7">
              {session?.user ? (
                <div>
                  <p className="text-lg font-medium">
                    <span className="text-green-500">{session.user.name}</span>
                    님 환영합니다!
                  </p>
                  <div className="flex space-x-3 text-sm font-light">
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/${session.user.id}`);
                        setIsSearchOpen(false);
                      }}
                    >
                      마이페이지
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        signOut({ redirect: false });
                        router.push("/");
                        setIsSearchOpen(false);
                      }}
                    >
                      로그아웃
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium ">로그인이 필요합니다.</p>
                  <div className="flex space-x-3 text-sm font-light">
                    <p
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="cursor-pointer"
                    >
                      로그인
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/join");
                      }}
                    >
                      회원가입
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 검색 폼 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${searchQuery}`);
              setSearchQuery("");
              setIsSearchOpen(false);
            }}
          >
            <input
              type="text"
              placeholder="🔍 상호명 검색"
              className="w-full border rounded p-3 outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
