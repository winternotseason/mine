"use client";

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import PostDeleteBtn from "@/components/post-delete-button";
import type { Post } from "@/app/(user)/service/page";
import { useSession } from "next-auth/react";
import { addReply } from "@/actions/post";

interface Props {
  params: { postid: string };
}

const DetailPost = ({ params }: Props) => {
  const { data: session } = useSession();
  const [post, setPost] = useState<Post>();
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/post`, {
        method: "POST",
        body: JSON.stringify(params.postid),
      });
      const data = await res.json();
      setLoading(false);
      const post: Post = data.post;
      setPost(post);
      if (data.reply) {
        setReply(data.reply);
      }
    };
    fetchPost();
  }, [params.postid]);

  if (loading) {
    return (
      <div className={classes.container}>
        <h1>로딩중...1</h1>
      </div>
    );
  }

  // 유효하지 않은 글 처리
  if (!loading && !post) {
    return (
      <div className={classes.container}>
        <h1>존재하지 않는 글입니다.</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={classes.container}>
        <h1>로그인이 필요합니다.</h1>
      </div>
    );
  }

  // session.user.email이 만약에 xitseo임
  if (session.user.email !== post.id && session.user.email !== "xitseo") {
    return (
      <div className={classes.container}>
        <h1>작성자만 볼 수 있는 글입니다.</h1>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1>1:1 문의</h1>
      <div className={classes.post_box}>
        <div className={classes.post_header}>
          <p>{post.title}</p>
          <p>{post.user}</p>
        </div>
        <div className={classes.post_content}>{post.content}</div>
        <PostDeleteBtn postid={params.postid} />
      </div>

      <div className={classes.reply_container}>
        {session.user.email === "xitseo" && !reply && (
          <form className={classes.reply_form} action={addReply}>
            <label>답변달기</label>
            <textarea name="content" />
            <button>확인</button>
            <input type="hidden" value={params.postid} name="postid" />
          </form>
        )}
        <div className={classes.reply_content}>
          <p>답변</p>
          <p>{reply ? reply : "작성된 답변이 없습니다."}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
