import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Product = ({ product }: { product: Product }) => {
  return (
    <article>
      <div className="w-40 h-40 relative">
        <Image src={product.imageUrl} alt="" fill />
      </div>
      <div>
        <p>{product.title}</p>
        <p>{dayjs(product.createAt).fromNow(true)}</p>
        <p>{product.price.toString()}원</p>
      </div>
    </article>
  );
};

export default Product;
