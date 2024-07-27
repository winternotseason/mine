import React from "react";

export const Skeleton = () => {
  return (
    <div className="animate-pulse w-full h-full">
      <div className="pt-5 pb-24 px-5">
        <div className="bg-gray-300 w-32 h-8 rounded-3xl mb-4"></div>
        {/* 작성자 프로필 */}
        <div className="flex items-center my-4">
          <div className="bg-gray-300 rounded-full w-12 h-12"></div>
          <div className="ml-2">
            <div className="bg-gray-300 w-24 h-4 mb-2 rounded"></div>
            <div className="bg-gray-300 w-20 h-4 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-300 w-64 h-8 mb-4 rounded"></div>
        {/* 장소 / 메뉴 / 별점 */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <div className="bg-gray-300 w-16 h-6 rounded-3xl"></div>
            <div className="ml-2 bg-gray-300 w-32 h-4 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 w-16 h-6 rounded-3xl"></div>
            <div className="ml-2 bg-gray-300 w-32 h-4 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 w-16 h-6 rounded-3xl"></div>
            <div className="ml-2 bg-gray-300 w-16 h-4 rounded"></div>
          </div>
        </div>
        {/* 글 내용 */}
        <div className="my-4 bg-gray-300 w-full h-32 rounded"></div>
        {/* 이미지 */}
        <div className="w-full aspect-square bg-gray-300 rounded"></div>
        <div className="border-[1px] rounded-3xl overflow-hidden mt-4">
          <div className="bg-gray-300 w-full h-48"></div>
          <div className="p-4">
            <div className="flex items-center">
              <div className="bg-gray-300 w-32 h-4 rounded"></div>
              <div className="ml-2 bg-gray-300 w-20 h-4 rounded"></div>
            </div>
            <div className="bg-gray-300 w-full h-4 mt-2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
