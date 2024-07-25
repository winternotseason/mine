import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { getPost } from "../../_lib/api-handler/Post";
import DetailPost from "../_components/DetailPost";


const PostPage = async ({ params }: { params: { postid: string } }) => {
  const { postid } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", postid],
    queryFn: getPost,
  });

  return (
    <>
      <DetailPost postid={postid} />
    </>
  );
};

export default PostPage;
