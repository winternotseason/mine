"use client";

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { useRouter } from "next/navigation";

export type Post = {
  _id: string;
  user: string;
  title: string;
  content: string;
  id: string;
};

const Sevice = () => {
  const [posts, setPosts] = useState<Post[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/post`);
      const data = await res.json();
      const posts: Post[] = data.posts;
      setPosts(posts);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.header}>
          <h1>고객센터</h1>
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}service/post`}
            className={classes.post_btn}
          >
            글쓰기
          </Link>
        </div>
        <div className={classes.posts_box}>
          {posts?.length === 0 ? (
            <p className={classes.empty_list}>작성된 글이 없습니다.</p>
          ) : (
            <ul className={classes.posts_list}>
              {posts?.reverse().map((post) => (
                <div
                  onClick={() => {
                    router.refresh();
                    router.push(
                      `${
                        process.env.NEXT_PUBLIC_URL
                      }service/${post._id.toString()}`
                    );
                  }}
                  key={post._id.toString()}
                >
                  <li className={classes.post}>
                    <p>{post.title}</p>
                    <p>{post.user}</p>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sevice;
