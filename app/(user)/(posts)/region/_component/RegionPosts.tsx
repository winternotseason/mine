"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPostsByRegion } from "../../../_lib/api-handler/Post";
import { IPost } from "../../../_lib/type";
import Post from "../../../_component/Post";

const RegionPosts = ({ city }: { city: string }) => {
  const { data: posts } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "region", city],
    queryFn: getPostsByRegion,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return (
    <div className="mt-5">
      <h1 className="font-semibold text-2xl my-5">
        📍 {decodeURIComponent(city)}
      </h1>
      {posts &&
        posts?.map((post) => <Post key={post._id.toString()} post={post} />)}
    </div>
  );
};

export default RegionPosts;
