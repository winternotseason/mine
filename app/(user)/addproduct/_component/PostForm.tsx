"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { IProduct } from "../../_lib/type";
import ImagePicker from "./ImagePicker";
import ProductFormSubmit from "./ProductFormSubmit";
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
  const { show, toggleModal } = useModalStore();
  const { address } = useAddressStore();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [menu, setMenu] = useState("");
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (productData: {
      title: string;
      price: string;
      content: string;
      image: File | null;
      seller: string;
    }) => {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", productData.price);
      formData.append("content", productData.content);
      if (productData.image) formData.append("image", productData.image);
      formData.append("seller", productData.seller);
      return fetcher(`${process.env.NEXT_PUBLIC_URL}api/products`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: async (insertedProduct) => {
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (prevdata: IProduct[]) => {
          const shallow = [...prevdata];
          shallow.unshift(insertedProduct);
          return shallow;
        });
      }
    },
    onError: (error) => {
      console.log("상품 업로드 오류", error);
    },
    onSettled: () => {
      router.push("/main");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      price,
      content,
      image,
      seller: session?.user.id || "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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

        <div
          onClick={toggleModal}
          className="bg-black/70 text-white text-xs px-2 py-1 rounded-md"
        >
          {address.place_name ? "변경" : "장소 검색"}
        </div>
      </div>
      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>가격</label>
        <input
          type="number"
          name="price"
          placeholder="가격을 입력해주세요"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />
      </div>

      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>메뉴</label>
        <input
          type="text"
          name="menu"
          placeholder="메뉴를 입력해주세요"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col mt-7">
        <label className={`${inputStyle}`}>상품설명</label>
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
      <ProductFormSubmit isPending={mutation.isPending} />
      {show && <MapSearchModal />}
    </form>
  );
};

export default PostForm;
