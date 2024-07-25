"use client";

import React from "react";

const PostFormSubmit = ({ isPending }: { isPending: boolean }) => {
  return (
    <button className="w-full flex items-center justify-center text-white py-3 rounded-lg bg-black">
      {isPending ? "상품 업로드중" : "상품 업로드"}
    </button>
  );
};

export default PostFormSubmit;
