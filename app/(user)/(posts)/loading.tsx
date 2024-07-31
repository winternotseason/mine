"use client";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-100">
      <MoonLoader size={50} />
    </div>
  );
};

export default Loading;
