'use client';

import React from "react";
import classes from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const { data, status } = useSession();

  return (
    <div className={classes.container}>
      {status === "unauthenticated" ? (
        <h2 className={classes.message}>로그인이 필요합니다</h2>
      ) : (
        <form>
          <div className={classes.input_title}>
            <label htmlFor="title">제목</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className={classes.input_content}>
            <label htmlFor="content">내용</label>
            <textarea name="content" id="content" />
          </div>
          <button>작성</button>
        </form>
      )}
    </div>
  );
};

export default PostPage;
