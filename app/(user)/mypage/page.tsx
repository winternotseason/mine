"use client";

import { useUserStore } from "@/lib/store/User";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Fallback from "../addproduct/_component/Fallback";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../_lib/getAllProducts";

const Mypage = () => {
  const { data } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: Infinity,
  });
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    return <Fallback />;
  }
  const myProduct = (data || []).filter(
    (product) => product.seller === user.id
  );

  const myPickProduct = (data || []).filter((product) =>
    product.Hearts.includes(user.id)
  );

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  };
  return (
    <div className="w-full h-full flex flex-col items-center space-y-7 p-4">
      {/* 프로필 */}
      <div className="flex bg-black/10 w-full p-4 rounded-md">
        {/* 프로필 캐릭터 */}
        <div className="w-32 h-32 relative">
          <Image src={`/avatar${user.selectedAvatar}.png`} alt="avatar" fill />
        </div>
        {/* 이름, 아이디 */}
        <div className="flex flex-col justify-center ml-4">
          <p className="text-2xl font-semibold">{user.name}</p>
          <p className="text-lg font-light">{user.id}</p>
        </div>
      </div>
      {/* 내가 등록한 상품 */}
      <div className="flex bg-black/10 w-full p-4 rounded-md justify-between">
        <p>내가 등록한 상품 {myProduct.length}</p>
        <p>보러가기 &gt;</p>
      </div>
      {/* 관심상품 목록 */}
      <div className="flex bg-black/10 w-full p-4 rounded-md">
        <p>관심상품 목록 {myPickProduct.length}</p>
      </div>
      <button onClick={handleSignOut} className="self-end text-black/40">
        로그아웃
      </button>
    </div>
  );
};

export default Mypage;
