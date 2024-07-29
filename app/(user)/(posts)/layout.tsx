import React from "react";
import PostBtn from "../_component/PostBtn";
import Header from "@/app/_component/Header";

interface Props {
  children: React.ReactNode;
}

const PostsLayout = ({ children }: Props) => {
  return (
    <div className="bg-gradient-to-r from-indigo-300 to-green-200">
      <Header />
      {children}
      <PostBtn />
    </div>
  );
};

export default PostsLayout;
