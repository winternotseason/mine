import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getPostsByQuery } from "../../../_lib/api-handler/Post";
import SearchResult from "../_component/SearchResult";
import FilterList from "@/app/(user)/_component/FilterList";

const PostPage = async ({ params }: { params: { query: string } }) => {
  const { query } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "query", query],
    queryFn: getPostsByQuery,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto pt-20 px-7 md:pt-0 ">
      <HydrationBoundary state={dehydratedState}>
        <FilterList />
        <SearchResult query={query} />
      </HydrationBoundary>
    </div>
  );
};

export default PostPage;
