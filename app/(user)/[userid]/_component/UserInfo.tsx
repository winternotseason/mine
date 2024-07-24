"use client";

import { Session } from "next-auth";
import React from "react";
import {
  getUser,
  getUserProducts,
} from "../../_lib/api-handler/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import { IProduct, User } from "../../_lib/type";
import Image from "next/image";
import Product from "../../main/_component/Product";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SkeletonProfile from "./SkeletonProfile";

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
  const { data: products, isLoading: isProductsLoading } = useQuery<
    IProduct[],
    Object,
    IProduct[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["products", "users", userid],
    queryFn: getUserProducts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if(isProductsLoading || isUserLoading) {
    return <SkeletonProfile />
  }
  return (
    <div className="p-10">
      {/* 내 프로필 */}
      <div className="flex border-b-[1px] p-3">
        <div className="w-40 h-40 relative">
          <Image src={`/avatar${user?.selectedAvatar}.png`} alt="avatar" fill />
        </div>
        <div>
          <p>{user?.name}</p>
          <p>{user?.id}</p>
          {session?.user.id === userid && (
            <button
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/");
                });
              }}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
      {/* 내가 올린 상품들 */}
      <div>
        <h1>판매중인 상품 : {products?.length}</h1>
        <ul>
          {products?.map((product) => (
            <Product product={product} key={product._id.toString()} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
