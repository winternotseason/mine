import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { getProduct } from "../../_lib/api-handler/getAllProducts";
import Image from "next/image";
import DetailProduct from "../_components/DetailProduct";

const ProductPage = async ({ params }: { params: { productid: string } }) => {
  const { productid } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", productid],
    queryFn: getProduct,
  });

  return (
    <>
      <DetailProduct productid={productid}/>
    </>
  );
};

export default ProductPage;
