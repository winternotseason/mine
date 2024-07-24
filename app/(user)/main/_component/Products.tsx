// _component/Products.tsx
"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getAllProducts } from "../../_lib/api-handler/getAllProducts";
import Product from "./Product";
import { IProduct } from "../../_lib/type";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

interface IProductResponse {
  products: IProduct[];
  nextCursor: number | null;
}

const Products: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IProductResponse,
    Object,
    InfiniteData<IProductResponse>,
    [_1: string],
    number // initialPageParams의 type자리
  >({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (isNaN(lastPage.nextCursor)) {
        return undefined;
      }

      return lastPage.nextCursor;
    },
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 10,
  });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.products.map((product) => (
            <Product product={product} key={product._id.toString()} />
          ))}
        </React.Fragment>
      ))}
      <div className="fixed bottom-0 left-0 w-full">
        {isFetching && hasNextPage && <ClipLoader size={50} color="#000000"/>} {/* 스피너 표시 */}
      </div>
      {/* ref를 데이터 리스트의 마지막에 위치시킵니다 */}
      <div ref={ref} className="h-12" />
    </>
  );
};

export default Products;
