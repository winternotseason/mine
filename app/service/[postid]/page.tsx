import { detailPost } from "@/lib/posts";
import React from "react";
import classes from "./page.module.css";
import PostDeleteBtn from "@/components/post-delete-button";

const DetailPost = async ({ params }: { params: { postid: string } }) => {
  const post = await detailPost(params.postid);
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
