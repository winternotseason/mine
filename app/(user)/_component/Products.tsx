"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "../_lib/getAllProducts";
import Product from "./Product";

const Products = () => {
  /* const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });*/

  const products: Product[] = [
    {
      seller: "winternot",
      imageUrl:
        "https://res.cloudinary.com/dr0110zlw/image/upload/v1721580282/mine-products/ghnmgvf1rr4cl8jefjgs.jpg",
      title: "바다",
      price: 24000,
      content: "예쁜바다입니다",
      Hearts: [],
      createAt: new Date(),
    },
    {
      seller: "katarinabluu",
      imageUrl:
        "https://res.cloudinary.com/dr0110zlw/image/upload/v1721580282/mine-products/ghnmgvf1rr4cl8jefjgs.jpg",
      title: "바다",
      price: 24000,
      content: "ggggg",
      Hearts: [],
      createAt: new Date(),
    },
    {
      seller: "imnotningning",
      imageUrl:
        "https://res.cloudinary.com/dr0110zlw/image/upload/v1721580282/mine-products/ghnmgvf1rr4cl8jefjgs.jpg",
      title: "바다",
      price: 24000,
      content: "예쁜바다입니다",
      Hearts: [],
      createAt: new Date(),
    },
  ];
  return (
    <>
      {products.map((product) => (
        <Product product={product} key={product.createAt.toISOString()}/>
      ))}
    </>
  );
};

export default Products;
