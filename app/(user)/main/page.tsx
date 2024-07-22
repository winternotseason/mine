import PlusButton from "@/components/plusbutton";
import { dummyProducts } from "@/lib/dummy";
import { getAllProducts } from "../_lib/getAllProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "../_component/Products";
import { Suspense } from "react";
import Fallback from "../addproduct/_component/Fallback";

// 등록된 상품들이 있는지? react-query로 불러오기
//

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  queryClient.getQueryData(["products"]);
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
