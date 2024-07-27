// _component/Posts.tsx
"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getAllPosts } from "../_lib/api-handler/Post";
import Post from "./Post";
import { IPost } from "../_lib/type";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

interface IPostResponse {
  posts: IPost[];
  nextCursor: number | null;
}

const Posts: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPostResponse,
    Object,
    InfiniteData<IPostResponse>,
    [_1: string],
    number // initialPageParams의 type자리
  >({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (isNaN(lastPage.nextCursor)) {
        return undefined;
      }
      console.log(lastPage)
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
  console.log(data);
  return (
    <>
      {data && data.pages && "posts" in data.pages[0] ? (
        data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.posts.map((post) => (
              <Post post={post} key={post._id.toString()} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <div className="fixed bottom-0 left-0 w-full">
        {isFetching && hasNextPage && <ClipLoader size={50} color="#000000" />}{" "}
        {/* 스피너 표시 */}
      </div>

      <div ref={ref} className="h-12" />
    </>
  );
};

export default Posts;

/*   const data = {
pageParamas: [{0 : 0}],
pages: [{
nextCursor : NaN,}]


} */
