"use client";
import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import PostDeleteBtn from "@/components/post-delete-button";
import type { Post } from "@/app/service/page";
import { useSession } from "next-auth/react";
interface Props {
  params: { postid: string };
}

const DetailPost = ({ params }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/post`, {
        method: "POST",
        body: JSON.stringify(params.postid),
      });
      const data = await res.json();
      setLoading(true);
      const post: Post = data.post;
      setPost(post);
    };
    fetchPost();
  }, [params.postid]);

  // 유효하지 않은 글 처리
  if (!post || !session || session.user.email !== post.id) {
    return (
      <div className={classes.container}>
        <h1>작성자만 볼 수 있습니다.</h1>
      </div>
    );
  }


  // 유효한 글 표시
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
