"use client";

import React from "react";
import classes from "./page.module.css";
import { post } from "@/actions/post";
import { auth } from "@/app/auth";
import { useSession } from "next-auth/react";

const PostPage = () => {
  const { data: session } = useSession();

  return (
    <div className={classes.container}>
      <h1>1:1 문의</h1>
      {!session ? (
        <h2 className={classes.message}>로그인이 필요합니다</h2>
      ) : (
        <form action={post}>
          <div className={classes.input_title}>
            <label htmlFor="title">제목</label>
            <input type="text" name="title" id="title" required />
          </div>
          <div className={classes.input_content}>
            <label htmlFor="content">내용</label>
            <textarea name="content" id="content" required />
          </div>
          <button>작성</button>
        </form>
      )}
    </div>
  );
};

export default PostPage;
