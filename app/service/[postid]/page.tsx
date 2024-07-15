import React from "react";

const DetailPost = ({ params }: { params: { postid: string } }) => {
  return <div>{params.postid}</div>;
};

export default DetailPost;
