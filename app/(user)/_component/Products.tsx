"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "../_lib/getAllProducts";
import Product from "./Product";

const Products = () => {
  const { data } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      {data?.map((product: IProduct) => (
        <Product product={product} key={Math.random()} />
      ))}
    </>
  );
};

export default Products;
