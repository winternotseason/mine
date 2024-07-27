import { auth } from "@/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getPostsByCategory } from "../../_lib/api-handler/Post";
import FiliterList from "../../_component/FiliterList";
import CategoryPosts from "../_component/CategoryPosts";

const CategroyPosts = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "category", name],
    queryFn: getPostsByCategory,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto pt-20 px-7">
      <HydrationBoundary state={dehydratedState}>
        <FiliterList />
        <CategoryPosts name={name}/>
      </HydrationBoundary>
    </div>
  );
};

export default CategroyPosts;
