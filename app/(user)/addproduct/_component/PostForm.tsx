"use client";

import React, { ChangeEvent, FormEvent } from "react";
import ImagePicker from "./ImagePicker";
import ProductFormSubmit from "./ProductFormSubmit";
import { useUserStore } from "@/lib/store/User";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";

const inputStyle = "font-semibold text-lg mb-2";

const PostForm = () => {
  const user = useUserStore((state) => state.user);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      console.log(image);
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("seller", session.user.id);
      return fetcher(`${process.env.NEXT_PUBLIC_URL}api/post`, {
        method: "POST",
        body: formData,
      });
    },
    // react-query의 data를 바꿈
    onSuccess: async (insertedProduct, variables) => {
      console.log(insertedProduct);
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (prevdata: IProduct[]) => {
          const shallow = [...prevdata];
          shallow.unshift(insertedProduct);
          return shallow;
        });
      }
    },
    onSettled : () => {
        router.push('/main')
    }
  });

  return (
    <form onSubmit={mutation.mutate}>
      {/* 이미지 업로드 */}
      <ImagePicker name="image" setImage={setImage} />
      {/* 제목 */}
      <div className="flex flex-col mt-3">
        <label className={`${inputStyle}`}>제목</label>
        <input
          type="text"
          name="title"
          required
          placeholder="제목"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col mt-3">
        <label className={`${inputStyle}`}>가격</label>
        <input
          type="number"
          name="price"
          required
          placeholder="가격을 입력해주세요"
          className="border-[1px] p-3 rounded-md outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col mt-3">
        <label className={`${inputStyle}`}>상품설명</label>
        <textarea
          name="content"
          className="h-40 resize-none border-[1px] p-2 outline-none"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </div>
      <ProductFormSubmit />
    </form>
  );
};

export default PostForm;
