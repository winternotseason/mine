"use client";

import React from "react";

const ProductFormSubmit = ({ isPending }: { isPending: boolean }) => {
  return <button>{isPending ? "상품 업로드중" : "상품 업로드"}</button>;
};

export default ProductFormSubmit;
