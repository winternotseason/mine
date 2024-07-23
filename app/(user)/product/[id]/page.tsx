"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "../../_lib/api-handler/getAllProducts";

const DetailProduct = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}의 게시글</div>;
};

export default DetailProduct;
