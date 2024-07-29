import React from "react";
import PostBtn from "../_component/PostBtn";
import Header from "@/app/_component/Header";

interface Props {
  children: React.ReactNode;
}

const PostsLayout = ({ children }: Props) => {
  return (
    <div className="max-w-[100rem]">
      <Header />
      {children}
      <PostBtn />
    </div>
  );
};

export default PostsLayout;
