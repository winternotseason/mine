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
        <div className="w-full h-40 bg-gradient-to-r from-indigo-300 to-green-200 text-black/70">
        <div className="pl-5 pt-5 cursor-pointer w-fit"
            onClick={() => {
              setIsSearchOpen(false);
            }}
          >
            ᐸ
          </div>
          <div className="p-10">
            {session?.user ? (
              <div>
                <p className="text-lg font-semibold">
                  {session.user.name}님 환영합니다!
                </p>
                <div className="flex space-x-3 text-sm">
                  <p
                    onClick={() => {
                      router.push(`/${session.user.id}`);
                      setIsSearchOpen(false);
                    }}
                  >
                    마이페이지
                  </p>
                  <p
                    onClick={() => {
                      signOut({ redirect: false });
                      router.refresh();
                      router.push("/");
                    }}
                  >
                    로그아웃
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold ">로그인이 필요합니다.</p>
                <div className="flex space-x-3  text-sm">
                  <p onClick={() => router.push("/login")} className="cursor-pointer">로그인</p>
                  <p className="cursor-pointer">회원가입</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 검색 폼 아웃소싱 */}
        <input
          type="text"
          placeholder="🔍 상호명/게시글 제목으로 검색해보세요! "
          className="w-full border rounded p-3 outline-none text-lg"
        />{" "}
      </div>
    </div>
  );
};

export default SideMenu;
