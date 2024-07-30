"use client";

import { useRouter } from "next/navigation";
import React from "react";

const DetailPostHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-[60rem] p-5 fixed z-50 top-0 flex justify-between bg-white md:hidden">
        <p onClick={() => router.back()} className="cursor-pointer">
          ᐸ
        </p>
        <p className="text-lg font-semibold flex-1 text-center">리뷰 상세</p>
      </div>
      {/* 데스크탑, 태블릿 헤더*/}
      <div className="hidden md:block">
        <div className="w-full max-w-[60rem] p-5 fixed z-50 top-0  justify-between bg-white hidden md:flex items-center">
          <p onClick={() => router.back()} className="cursor-pointer">
            ᐸ
          </p>
          <p className="text-lg font-semibold flex-1 text-center">리뷰 상세</p>
        </div>
      </div>
    </>
  );
};

export default DetailPostHeader;
