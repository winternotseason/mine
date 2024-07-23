"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IProduct, User } from "../../_lib/type";
import { getProduct, getUser } from "../../_lib/api-handler/getAllProducts";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const DetailProduct = ({ productid }: { productid: string }) => {
  const { data: product } = useQuery<
    IProduct,
    Object,
    IProduct,
    [_1: string, _2: string]
  >({
    queryKey: ["users", productid],
    queryFn: getProduct,
  });
  const { data: user } = useQuery<User, Object, User, [_1: string, _2: string]>(
    {
      queryKey: ["users", product?.seller],
      queryFn: getUser,
    }
  );

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {/* 상품 이미지 */}
        <div className="w-full aspect-square relative">
          <Image src={product?.imageUri} alt="productimage" fill />
        </div>
        {/* 상품 정보 */}
        <div className="p-5">
          {/* 상품 정보 상단 (판매자 정보) */}

          <div className="flex items-center">
            <Link href={`${process.env.NEXT_PUBLIC_URL}${product?.seller}`}>
              <div className="w-20 h-20 relative rounded-full overflow-hidden">
                <Image
                  src={`/avatar${user?.selectedAvatar}.png`}
                  alt="avatar"
                  fill
                />
              </div>{" "}
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_URL}${product?.seller}`}>
              <p className="ml-4 font-bold text-2xl">{user?.name}</p>{" "}
            </Link>
          </div>
          {/* 상품 정보 하단 (상품 정보) */}
          <div>
            <h3 className="font-bold text-4xl">{product?.title}</h3>
            <p>{dayjs(product?.createAt).fromNow(false)}</p>
            <p className="mt-4 text-xl">{product?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
