"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IPost, User } from "../../_lib/type";
import { getUser } from "../../_lib/api-handler/User";
import { getPost } from "../../_lib/api-handler/Post";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import { Skeleton } from "./Skeleton";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const DetailPost = ({ postid }: { postid: string }) => {
  const { data: post, isLoading: isPostLoading } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["post", postid],
    queryFn: getPost,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const { data: user, isLoading: isUserLoading } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", post?.writer], // 빈 문자열로 대체하여 ['users', null] 방지
    queryFn: getUser, // post가 존재할 때만 실행
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (isPostLoading || isUserLoading) {
    return <Skeleton />;
  }
  console.log(user, post);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {/* 상품 이미지 */}
        <div className="w-full aspect-square relative overflow-hidden">
          <Image src={post?.imageUri} alt="Postimage" fill priority />
        </div>
        {/* 상품 정보 */}
        <div className="p-5">
          {/* 상품 정보 상단 (판매자 정보) */}

          <div className="flex items-center">
            <Link href={`${process.env.NEXT_PUBLIC_URL}${post?.writer}`}>
              <div className="w-full rounded-full overflow-hidden">
                <Image
                  src={`/avatar${user?.selectedAvatar}.png`}
                  alt="avatar"
                  width={80}
                  height={80}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  placeholder="blur"
                  priority
                />
              </div>{" "}
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_URL}${post?.writer}`}>
              <p className="ml-4 font-bold text-2xl">{user?.name}</p>{" "}
            </Link>
          </div>
          {/* 상품 정보 하단 (상품 정보) */}
          <div>
            <h3 className="font-bold text-4xl">{post?.title}</h3>
            <p>{dayjs(post?.createAt).fromNow(false)}</p>
            <p className="mt-4 text-xl">{post?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
