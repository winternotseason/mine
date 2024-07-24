import React from "react";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-black border-t-transparent border-solid rounded-full animate-spin" />
    </div>
  );
};

export default loading;
