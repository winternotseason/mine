// components/AuthForm.js
import React from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  linkHref: string;
  linkText: string;
}

const AuthForm = ({ children, linkHref, linkText }: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">MINE</h1>
      {children}
      <Link href={linkHref} className="text-gray-500 text-sm">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthForm;
