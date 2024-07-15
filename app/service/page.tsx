import React from "react";
import classes from "./page.module.css";
import Link from "next/link";

const Sevice = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>고객센터</h1>
        <Link href="/service/post" className={classes.post_btn}>글쓰기</Link>
      </div>
      <div className={classes.posts_list}>
        글목록
      </div>
    </div>
  );
};

export default Sevice;
