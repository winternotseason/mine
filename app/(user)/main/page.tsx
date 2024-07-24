import PlusButton from "@/components/plusbutton";
import { getAllProducts } from "../_lib/api-handler/getAllProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./_component/Products";

export default async function Home() {
  const queryClient = new QueryClient();
  // prefetchQuery : SSR/SSG에서 서버 측에서 미리 데이터를 가져와 클라이언트에게 전달
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full overflow-auto">
      <HydrationBoundary state={dehydratedState}>
        <Products />
      </HydrationBoundary>
      <PlusButton />
    </div>
  );
}
