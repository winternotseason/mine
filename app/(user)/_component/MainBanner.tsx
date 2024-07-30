"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MainBanner = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <>
      {/* 헤더 */}
      <div className="w-full max-w-[60rem] p-5 fixed z-30 top-0  justify-between bg-white hidden md:flex items-center">
        <p onClick={() => router.back()} className="cursor-pointer">
          ᐸ
        </p>
        <p className="text-lg font-semibold flex-1 text-center">{title}</p>
      </div>
      {/* 배너 */}
      <div className="relative h-96 mt-20 lg:flex md:flex flex-col justify-center pl-10 text-white bg-banner bg-cover hidden">
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="font-bold text-5xl relative z-10">
          <span className="text-green-500">맛</span>의 즐거움,
          <span className="text-green-500">공유</span>의 행복
        </h1>
        <p className="mt-2 relative z-10 font-light">
          후기를 통해 맛을 공유해보세요!
        </p>
      </div>
    </>
  );
};

export default MainBanner;
