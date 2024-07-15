"use client";

import React from "react";
import classes from "./post-delete-button.module.css";
import { useRouter } from "next/navigation";

const PostDeleteBtn = ({ postid }: { postid: string }) => {
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/postdelete`, {
        method: "POST",
        body: JSON.stringify(postid),
      });
      const result = await res.json();
      console.log(result)
      if(result.status === 201) {
        router.push('/service')
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button className={classes.btn} onClick={handleDeletePost}>
      삭제
    </button>
  );
};

export default PostDeleteBtn;
