import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

interface Props {
  text: string;
}

const SubmitButton = ({ text }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button className="text-sm cursor-pointer mt-3 text-white bg-black w-full p-3 rounded-lg shadow-md hover:bg-black/80 transition duration-200 ">
      {pending ? <ClipLoader color="#eeeeee" size={20} /> : text}
    </button>
  );
};

export default SubmitButton;
