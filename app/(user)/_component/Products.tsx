"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "../_lib/getAllProducts";
import Product from "./Product";

const Products = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      {data?.map((product: Product) => (
        <Product product={product} key={Math.random()} />
      ))}
    </>
  );
};

export default Products;
