import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getPostsByRegion } from "../../../_lib/api-handler/Post";
import RegionPosts from "../_component/RegionPosts";
import FilterList from "../../../_component/Filter/FilterList";

const CategroyPosts = async ({ params }: { params: { city: string } }) => {
  const { city } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "region", city],
    queryFn: getPostsByRegion,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto pt-20 px-7 md:pt-0 ">
      <HydrationBoundary state={dehydratedState}>
        <FilterList />
        <RegionPosts city={city} />
      </HydrationBoundary>
    </div>
  );
};

export default CategroyPosts;
