import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-[60rem]">
        <HydrationBoundary state={dehydratedState}>
          <DetailPost postid={postid} />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default PostPage;
