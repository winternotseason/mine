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

const inputStyle = "font-semibold text-lg mb-2";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      // form의 onSubmit에 mutation.mutate
      console.log(image);
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("seller", session.user.id);
      return fetcher(`${process.env.NEXT_PUBLIC_URL}api/product`, {
        method: "POST",
        body: formData,
      });
    },
    // 성공적으로 DB에 입력되었을때
    onSuccess: async (insertedProduct, variables) => {
      console.log(insertedProduct);
      // 성공하면?
      // 서버에서 최신 데이터를 가져오도록 트리거 : queryClient.invalidateQueries({queryKey:['products']}) => 서버 요청 발생
      // 현재 캐시에 있는 데이터를 직접 업데이트. 서버에 요청을 보내지 않고 로컬 캐시만 업데이트
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (prevdata: IProduct[]) => {
          const shallow = [...prevdata];
          shallow.unshift(insertedProduct);
          return shallow;
        });
      }
    },
    onError: () => {
      console.log("상품 업로드 오류");
    },
    // 성공 실패 여부에 관계 없음
    onSettled: (_, error) => {
      if (error) return;
      // error가 없다면 main 화면으로 redirect
      router.push("/main");
    },
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
      <ProductFormSubmit isPending={mutation.isPending} />
    </form>
  );
};

export default PostForm;
