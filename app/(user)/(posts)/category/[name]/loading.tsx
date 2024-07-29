import React from "react";

const CategoryPostsLoading = () => {
  return (
    <div className="bg-white pt-20 px-7 animate-pulse h-screen">
      <div className="flex space-x-3">
        <div
          className="flex items-center bg-black/10 py-2 px-3 rounded-3xl text-sm space-x-1 "
          style={{ width: "100px", height: "30px" }}
        />
        <div
          className="flex items-center bg-black/10 py-2 px-3 rounded-3xl text-sm space-x-1 "
          style={{ width: "100px", height: "30px" }}
        />
      </div>
      <div className="mt-5 bg-black/10 py-4 px-3 rounded-3xl w-1/3" />
      <div className="mt-5 bg-black/10 py-16 px-3 rounded-3xl"/>
      <div className="mt-5 bg-black/10 py-16 px-3 rounded-3xl"/>
      <div className="mt-5 bg-black/10 py-16 px-3 rounded-3xl"/>
    </div>
  );
};

export default CategoryPostsLoading;
