"use client";

import { useUserStore } from "@/lib/store/User";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const Mypage = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  if (!user) {
    return <div>Loading...</div>;
  }
  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  };
  return (
    <div>
      <p>ID: {user.id}</p>
      <div>
        Avatar:
        <div className="w-32 h-32 relative">
          <Image src={`/avatar${user.selectedAvatar}.png`} alt="avatar" fill />
        </div>
      </div>
      <p>Name: {user.name}</p>
      <button onClick={handleSignOut}>로그아웃</button>
    </div>
  );
};

export default Mypage;
