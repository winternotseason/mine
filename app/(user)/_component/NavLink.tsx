"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { Session } from "next-auth";

export const iconStyle = "flex flex-col items-center justify-center";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  if (href === "/main") {
    if (path === href) {
      return (
        <Link href="/main" className={iconStyle}>
          <GoHomeFill size={25} />
          <p className="text-sm">{children}</p>
        </Link>
      );
    } else {
      return (
        <Link href="/main" className={iconStyle}>
          <GoHome size={25} />
          <p className="text-sm">{children}</p>
        </Link>
      );
    }
  }

  return (
    <Link href={href} className={iconStyle}>
      {path === href ? <IoPerson size={25} /> : <IoPersonOutline size={25} />}
      <p className="text-sm">{children}</p>
    </Link>
  );
}
