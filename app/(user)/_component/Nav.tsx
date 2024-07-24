"use client";

import React from "react";
import NavLink, { iconStyle } from "./NavLink";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // href={`/${session?.user?.id}`}
  return (
    <div className="fixed z-50  w-full bottom-0 py-2 px-8 flex justify-between border-b-[1px] bg-white items-center">
      <div className={iconStyle} onClick={() => router.back()}>
        <RiArrowGoBackFill size={25} />
        <p className="text-sm">뒤로가기</p>
      </div>
      <NavLink href="/main">홈</NavLink>
      <NavLink href={`/${session?.user?.id}`}>내정보</NavLink>
    </div>
  );
};

export default Nav;
