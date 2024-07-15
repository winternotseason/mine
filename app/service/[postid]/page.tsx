import { detailPost } from "@/lib/posts";
import React from "react";
import classes from "./page.module.css";
import PostDeleteBtn from "@/components/post-delete-button";
import { auth } from "@/app/auth";

const DetailPost = async ({ params }: { params: { postid: string } }) => {
  const post = await detailPost(params.postid);
  const session = await auth();

  if (!post) {
    return (
      <div className={classes.container}>
        <h1>유효하지 않은 글입니다.</h1>
      </div>
    );
  }

  if (session.user.email !== post.id) {
    return (
      <div className={classes.container}>
        <h1>작성자만 볼 수 있습니다.</h1>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.post_box}>
        <div className={classes.post_header}>
          <p>{post.title}</p>
          <p>{post.user}</p>
        </div>
        <div className={classes.post_content}>{post.content}</div>
        <PostDeleteBtn postid={params.postid} />
      </div>
    </div>
  );
};

export default DetailPost;
