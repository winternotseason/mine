"use client";


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
      <div className="fixed z-10 w-full top-0 right-0 px-4 py-5 flex justify-between  items-center backdrop-blur-sm">
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
      <SideMenu setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
    </div>
  );
};

export default Header;
