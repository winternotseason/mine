"use client";

import Image from "next/image";
import React, { useState } from "react";
import { RiMenuSearchLine } from "react-icons/ri";
import SideMenu from "./SideMenu";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="relative">
      <div className="fixed z-10 w-full top-0 right-0 p-4 flex justify-between border-b-[1px] bg-white items-center">
        <div className="w-10 h-10 relative cursor-pointer" onClick={() => {
          router.replace('/')
        }}>
          <Image src="/icon.PNG" fill alt="logo" priority />
        </div>
        <RiMenuSearchLine
          size={25}
          onClick={toggleSearch}
          className="cursor-pointer"
        />
      </div>

      {/* 사이드 아코디언 메뉴 */}
      <SideMenu setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
    </div>
  );
};

export default Header;
