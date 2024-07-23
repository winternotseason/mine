import Image from "next/image";
import { GoHeart } from "react-icons/go";

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import { IProduct } from "../_lib/type";

dayjs.extend(relativeTime);
dayjs.locale("ko");
const Product = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/product/${product._id.toString()}`}>
      <article className="flex p-4 hover:bg-black/10 transition-all duration-100 border-b-[1px]">
        <div className="w-40 h-40 relative rounded-lg overflow-hidden">
          <Image src={product.imageUri} alt="image" fill sizes="100%" />
        </div>
        <div className="flex flex-col h-40 justify-between ml-4">
          <div>
            <p className="text-xl">{product.title}</p>
            <p className="text-gray-500">
              {dayjs(product.createAt).fromNow(true)}
            </p>
            <p className="font-semibold text-lg">{product.price}원</p>
          </div>
          <div className="flex items-center">
            <GoHeart color="#949494" />
            <p className="ml-1 text-gray-500">{product.Hearts.length}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Product;
