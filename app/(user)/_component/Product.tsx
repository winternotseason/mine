import Image from "next/image";
import React from "react";

const Product = ({ product }: { product: Product }) => {
  return (
    <div key={product.seller}>
      <div className="w-40 h-40 relative">
        <Image src={product.imageUrl} alt="" fill />
      </div>
      <div>
        <p>{product.title}</p>
        <p>{product.createAt.toISOString()}</p>
        <p>{product.price.toString()}원</p>
      </div>
    </div>
  );
};

export default Product;
