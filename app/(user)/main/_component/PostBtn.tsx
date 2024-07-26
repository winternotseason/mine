import React from 'react';
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
const PostBtn = () => {
    return (
        <Link
        href="/addpost"
        className="fixed bottom-20 right-3 shadow-lg rounded-3xl text-white bg-black flex p-3 items-center"
      >
        <AiOutlinePlus size={20} color="#ffffff" />
        <p className="pl-1">글쓰기</p>
      </Link>
    );
};

export default PostBtn;