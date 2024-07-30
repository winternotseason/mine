"use client";

import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { IPost, Category, Region } from "../../_lib/type";
import ImagePicker from "./ImagePicker";
import PostFormSubmit from "./PostFormSubmit";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import MapSearchModal from "./MapSearchModal";
import { useAddressStore, useModalStore } from "@/lib/store/mapStore";
import StarRating from "./StarRating";

const inputStyle = "font-semibold mb-2";

const PostForm = () => {
  const { show, openModal } = useModalStore();
  const { address, setAddress } = useAddressStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [menu, setMenu] = useState("");
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (postData: {
      title: string;
      menu: string;
      rating: number;
      content: string;
      image: File | null;
    }) => {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("menu", postData.menu);
      formData.append("rating", postData.rating.toString());
      formData.append("content", postData.content);
      formData.append("address", JSON.stringify(address));
      setAddress({
        address_name: "",
        place_name: "",
        phone: "",
        location_x: "",
        location_y: "",
        category: "",
      });
      if (postData.image) formData.append("image", postData.image);
      formData.append("writer", session?.user.id);
      return fetcher(`${process.env.NEXT_PUBLIC_URL}api/posts`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: async () => {
      // posts 업데이트
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // 카테고리 카운트 업데이트
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // 지역 업데이트
      queryClient.invalidateQueries({ queryKey: ["region"] });
    },
    onError: (error) => {
      console.error("상품 업로드 오류", error);
    },
    onSettled: () => {
      router.replace("/");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      menu,
      content,
      image,
      rating,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-14">
      {/* 이미지 업로드 */}
      <ImagePicker name="image" setImage={setImage} />
      {/* 제목 */}
      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>제목</label>
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      <div className="flex mt-7 items-center">
        <p className="font-semibold mr-4">장소</p>
        {address.place_name && (
          <div className="mr-4">
            <p className="mr-1 text-sm">{address.place_name}</p>
            <p className="text-xs text-black/50">{address.address_name}</p>
          </div>
        )}

        <button
          type="button"
          onClick={openModal}
          className="bg-black/70 text-white text-xs px-2 py-1 rounded-md"
        >
          {address.place_name ? "변경" : "장소 검색"}
        </button>
      </div>

      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>메뉴</label>
        <input
          type="text"
          name="menu"
          placeholder="메뉴를 입력해주세요"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMenu(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>설명</label>
        <textarea
          name="content"
          className="h-40 resize-none border-[1px] p-2 outline-none"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </div>
      <div className="flex my-4 items-center">
        <label className="font-semibold mr-2">별점</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <PostFormSubmit isPending={mutation.isPending} />
      {show && <MapSearchModal />}
    </form>
  );
};

export default PostForm;

/* data = { pageParmas : [0] , pages: [{nextCursor : NaN , posts : [ {데이터들} , {데이터들} , {데이터들} ]}] 
} */
