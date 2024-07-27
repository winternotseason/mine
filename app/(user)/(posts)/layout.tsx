import React from "react";
import FilterList from "../_component/FilterList";
import PostBtn from "../_component/PostBtn";

interface Props {
  children: React.ReactNode;
}

const PostsLayout = ({ children }: Props) => {
  return (
    <>
      {children}
      <PostBtn />
    </>
  );
};

export default PostsLayout;
