"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="relative">
      <div className="fixed z-10 w-full max-w-[40rem] top-0 right-0 p-4 flex justify-between border-b-[1px] bg-white items-center">
        <div className="w-10 h-10 relative">
          <Image src="/icon.PNG" fill alt="logo" priority />
        </div>
        <CiSearch size={25} onClick={toggleSearch} />
      </div>
      
      {/* 검색 컴포넌트 */}
      <div
        className={`fixed z-50 top-0 right-0 h-full bg-white border-l-2 border-gray-300 transition-transform duration-300 ease-in-out ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "100vw" }}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded px-3 py-2"
          />
          <div onClick={toggleSearch}>x</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
