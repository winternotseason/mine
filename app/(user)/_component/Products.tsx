"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "../_lib/api-handler/getAllProducts";
import Product from "./Product";
import { IProduct } from "../_lib/type";
const Products = () => {
  const { isFetching, data } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  if (isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data?.map((product: IProduct) => (
        <Product product={product} key={Math.random()} />
      ))}
    </>
  );
};

export default Products;
