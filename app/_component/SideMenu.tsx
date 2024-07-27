"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const SideMenu = ({ isSearchOpen, setIsSearchOpen }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div
      className={`fixed z-50 w-full md:w-1/2 top-0 right-0 h-full bg-white border-l-2 border-gray-300 transition-transform duration-300 ease-in-out ${
        isSearchOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
        {/* 회원 여부 */}
        <div className="w-full h-40 bg-black ">
          <div className="p-10">
            {session?.user ? (
              <div>
                <p className="text-lg font-semibold text-white">
                  {session.user.name}님 환영합니다!
                </p>
                <div className="flex space-x-3 text-white/80 text-sm">
                  <p>마이페이지</p>
                  <p
                    onClick={() => {
                      signOut();
                    }}
                  >
                    로그아웃
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-white">
                  로그인이 필요합니다.
                </p>
                <div className="flex space-x-3 text-white/80 text-sm">
                  <p onClick={() => router.push('/login')}>로그인</p>
                  <p>회원가입</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="상호명/게시글 제목을 검색해보세요!"
          className="w-full border rounded p-3 outline-none text-lg"
        />{" "}
        <div
          onClick={() => {
            setIsSearchOpen(false);
          }}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
