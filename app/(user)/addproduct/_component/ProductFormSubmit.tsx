"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const ProductFormSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full text-white bg-black flex justify-center items-center p-3 mt-4 rounded-lg ${pending && 'bg-gray-700'}`}
    >
      {pending ? "상품 업로드 중..." : "상품 업로드"}
    </button>
  );
};

export default ProductFormSubmit;
