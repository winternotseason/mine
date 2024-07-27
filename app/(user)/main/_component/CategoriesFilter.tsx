"use client";

import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import { getCategories } from "../../_lib/api-handler/Categories";
import { Category } from "../../_lib/type";
import { MdNoMeals } from "react-icons/md";
interface Props {
  isCategoryOpen: boolean;
  setIsCategoryOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoriesFilter = ({ isCategoryOpen, setIsCategoryOpen }: Props) => {
  const { data, isLoading } = useQuery<Category[], Object, Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  console.log(data);
  return (
    <div
      className={`fixed z-50 top-0 left-0 h-full bg-white  transition-transform duration-300 ease-in-out ${
        isCategoryOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "100vw" }}
    >
      <div className="p-5">
        <div onClick={() => setIsCategoryOpen(false)} className="mt-2 cursor-pointer">
          ᐸ
        </div>
        <div className="mt-5 space-y-3">
        <p className="text-sm font-light text-center mb-7">
        올라온 리뷰들의 카테고리만 표시됩니다.
        </p>
          {data?.map((category) => (
            <div
              key={category.category}
              className="flex space-x-2 bg-black/10 rounded-3xl text-sm w-fit py-2 px-4"
            >
              <div className="flex items-center space-x-1">
                <MdNoMeals />
                <p>{category.category}</p>
              </div>

              <p>{category.count}</p>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default CategoriesFilter;
