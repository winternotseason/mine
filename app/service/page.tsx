import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

const Sevice = async () => {
  const posts = await getPosts();

  return (
    <div className={classes.container}>
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
        {posts.length === 0 ? (
          "작성된 글이 없습니다."
        ) : (
          <ul className={classes.posts_list}>
            {posts.reverse().map((post) => (
              <Link
                href={`${
                  process.env.NEXT_PUBLIC_URL
                }service/${post._id.toString()}`}
                key={post._id.toString()}
              >
                <li className={classes.post}>
                  <p>{post.title}</p>
                  <p>{post.user}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sevice;
