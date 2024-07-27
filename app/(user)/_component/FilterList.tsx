"use client";

import React, { useState } from "react";
import { MdPlace } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import CategoriesFilter from "./CategoriesFilter";
import RegionFilter from "./RegionFilter";
const style =
  "flex items-center bg-black/10 py-2 px-3 rounded-3xl text-sm space-x-1";

const FilterList = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const toggleSearch = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="flex space-x-3">
      <div
        className={style}
        onClick={() => {
          setIsCategoryOpen(true);
        }}
      >
        <BiCategory size={15} />
        <p>카테고리</p>
      </div>
      <div
        className={style}
        onClick={() => {
          setIsRegionOpen(true);
        }}
      >
        <MdPlace size={15} />
        <p>지역별</p>
      </div>
      {/* 카테고리 */}
      <CategoriesFilter
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
      />
      {/* 지역 */}
      <RegionFilter
        isRegionOpen={isRegionOpen}
        setIsRegionOpen={setIsRegionOpen}
      />
    </div>
  );
};

export default FilterList;
