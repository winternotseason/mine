import PlusButton from "@/components/plusbutton";
import { getAllProducts } from "../_lib/getAllProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "../_component/Products";

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
