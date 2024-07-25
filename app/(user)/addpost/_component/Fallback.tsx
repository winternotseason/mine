import React from "react";
import { ClipLoader } from "react-spinners";

const Fallback = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClipLoader color="#000000" size={50} />
    </div>
  );
};

export default Fallback;
