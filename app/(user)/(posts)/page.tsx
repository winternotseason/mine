import { getAllPosts } from "../_lib/api-handler/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Posts from "../_component/Posts";

import { getCategories } from "../_lib/api-handler/Categories";
import { getRegion } from "../_lib/api-handler/Region";
import FilterList from "../_component/FilterList";

export default async function Home() {
  const queryClient = new QueryClient();
  // prefetchQuery : SSR/SSG에서 서버 측에서 미리 데이터를 가져와 클라이언트에게 전달
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ["region"],
    queryFn: getRegion,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto pt-14">
      <div className="h-80 py-8 flex justify-center px-7">
        <div className="bg-white w-full md:w-2/3 h-full rounded-3xl flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold mb-3">
            <span className="text-green-500">#</span>MINE
          </h1>
          <h2 className="text-lg md:text-2xl font-bold">감명 깊었던 전국 맛집,</h2>
          <h2 className="text-lg md:text-2xl font-bold">함께 공유하고 즐겨보세요!</h2>
          <p className="mt-5">🍜 🍚 🍭 🍕 🍩</p>
        </div>
      </div>
      <div className="pt-4 px-7 bg-white">
        <HydrationBoundary state={dehydratedState}>
          <FilterList />
          <Posts />
        </HydrationBoundary>
      </div>
    </div>
  );
}
