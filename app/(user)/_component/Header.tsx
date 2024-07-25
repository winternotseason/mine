import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <div className="fixed z-10  w-full max-w-[40rem] top-0 p-4 flex justify-between border-b-[1px] bg-white items-center">
      <div className="w-10 h-10 relative">
        <Image src="/icon.PNG" fill alt="logo" priority />
      </div>
      <CiSearch size={25} />
    </div>
  );
};

export default Header;
