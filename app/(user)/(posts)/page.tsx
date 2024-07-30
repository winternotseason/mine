import { getAllPosts } from "../_lib/api-handler/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Posts from "../_component/Posts";

import { getCategories } from "../_lib/api-handler/Categories";
import { getRegion } from "../_lib/api-handler/Region";
import FilterList from "../_component/Filter/FilterList";

export default async function Home() {
  const queryClient = new QueryClient();
  // prefetchQuery : SSR/SSG에서 서버 측에서 미리 데이터를 가져와 클라이언트에게 전달
  
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    initialPageParam: 0,
  });

 

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto pt-[63px] md:pt-0">
      {/* 모바일 배너 */}
      <div className="relative first:h-80 py-8 flex justify-center px-7 md:hidden bg-banner bg-cover">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="w-full h-full  flex flex-col items-center justify-center relative z-10 text-white">
          <h2 className="text-2xl  font-bold">
            <span className="text-green-500">감명</span> 깊었던 전국 맛집,
          </h2>
          <h2 className="text-2xl font-bold">
            함께 <span className="text-green-500">공유</span>하고 즐겨보세요!
          </h2>
        </div>
      </div>
      {/* pc 배너 */}
      <div className="relative h-96 lg:flex md:flex flex-col justify-center pl-10 text-white bg-banner bg-cover hidden">
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="font-bold text-5xl relative z-10">
          <span className="text-green-500">맛</span>의 즐거움,
          <span className="text-green-500">공유</span>의 행복
        </h1>
        <p className="mt-2 relative z-10 font-light">
          후기를 통해 맛을 공유해보세요!
        </p>
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
