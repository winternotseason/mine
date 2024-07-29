"use client";

import React from "react";

const PostFormSubmit = ({ isPending }: { isPending: boolean }) => {
  return (
    <button className="w-full flex items-center justify-center text-white py-3 rounded-lg bg-green-600">
      {isPending ? "업로드중..." : "게시글 업로드"}
    </button>
  );
};

export default PostFormSubmit;
