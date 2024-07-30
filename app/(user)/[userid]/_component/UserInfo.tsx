"use client";

import { Session } from "next-auth";
import React from "react";
import { getUser, getUserPosts } from "../../_lib/api-handler/User";
import { useQuery } from "@tanstack/react-query";
import { IPost, User } from "../../_lib/type";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SkeletonProfile from "./SkeletonProfile";
import Post from "../../_component/Post";

interface Props {
  userid: string;
  session: Session;
}

const UserInfo = ({ userid, session }: Props) => {
  const router = useRouter();
  const {
    data: user,
    error,
    isLoading: isUserLoading,
  } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ["users", userid],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  // 여기서 user마다 작성한 글과 하트 누른 게시글 불러와야함.
  const { data: posts, isLoading: ispostsLoading } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", userid],
    queryFn: getUserPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (ispostsLoading || isUserLoading) {
    return <SkeletonProfile />;
  }
  return (
    <div className="p-10">
      {/* 내 프로필 */}
      <div className="flex border-b-[1px] p-3">
        <div className="w-40 h-40 relative">
          <Image src={`/avatar${user?.selectedAvatar}.png`} alt="avatar" fill />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p>{user?.name}</p>
            <p>{user?.id}</p>
          </div>
          {session?.user.id === userid && (
            <button
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/");
                });
              }}
              className="text-sm font-light text-black/50"
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
      {/* 내가 올린 상품들 */}
      <h1 className="my-5 text-lg font-semibold">
        {session?.user.id === userid
          ? "📄 내가 업로드한 리뷰"
          : `📄 ${userid} 님이 업로드한 리뷰`}
      </h1>
      <div className=" md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts?.map((post) => (
          <Post post={post} key={post._id.toString()} />
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
