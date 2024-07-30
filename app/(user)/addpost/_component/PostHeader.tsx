"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PostHeader = () => {
  const router = useRouter();
  return (
    <div className="w-full max-w-[60rem] p-5 fixed z-30 top-0 flex justify-between bg-white md:hidden">
      <p onClick={() => router.back()} className="cursor-pointer">
        ᐸ
      </p>
      <p className="text-lg font-semibold flex-1 text-center">게시글 업로드</p>
    </div>
  );
};

export default PostHeader;

{
  /* 모바일 헤더 */
}
