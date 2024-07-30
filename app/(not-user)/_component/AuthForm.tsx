// components/AuthForm.js
import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  linkHref: string;
  linkText: string;
}

const AuthForm = async ({ children, linkHref, linkText }: Props) => {
  const session = await auth();
  if(session) {
    redirect('/')
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Link href="/"><h1 className="text-3xl font-semibold"><span className="text-green-500">#</span>MINE</h1></Link>
      {children}
      <Link href={linkHref} className="text-gray-500 text-sm">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthForm;
