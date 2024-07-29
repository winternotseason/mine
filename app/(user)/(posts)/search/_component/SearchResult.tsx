"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IPost } from "../../../_lib/type";
import Post from "../../../_component/Post";
import { getPostsByQuery } from "../../../_lib/api-handler/Post";

const SearchResult = ({ query }: { query: string }) => {
  const { data: posts } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "query", query],
    queryFn: getPostsByQuery,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return (
    <div className="mt-5">
      <h1 className="font-semibold text-2xl my-5 ">
        📍 {decodeURIComponent(query)}
      </h1>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-4 gap-x-5">
        {posts &&
          posts?.map((post) => <Post key={post._id.toString()} post={post} />)}
      </div>
    </div>
  );
};

export default SearchResult;
