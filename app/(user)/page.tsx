import { getAllPosts } from "./_lib/api-handler/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Posts from "./_component/Posts";
import PostBtn from "./_component/PostBtn";
import FiliterList from "./_component/FiliterList";
import { getCategories } from "./_lib/api-handler/Categories";
import { getRegion } from "./_lib/api-handler/Region";

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
    <div className="w-full h-full overflow-auto mt-3">
      <HydrationBoundary state={dehydratedState}>
        <FiliterList />
        <Posts />
      </HydrationBoundary>
      <PostBtn />
    </div>
  );
}
