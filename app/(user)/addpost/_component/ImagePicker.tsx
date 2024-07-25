"use client";

import { File } from "buffer";
import Image from "next/image";
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { CiCamera } from "react-icons/ci";

const ImagePicker = ({ name, setImage }: { name: string; setImage: any }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imageRef = useRef(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
  };

  const handlePickClick = () => {
    imageRef.current?.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPickedImage(null);
  };

  return (
    <div className="flex">
      <input
        type="file"
        accept="image/png, image/jpeg"
        name={name}
        ref={imageRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handlePickClick}
        className="w-24 h-24 border-[1px] flex flex-col justify-center items-center rounded-lg"
      >
        <CiCamera size={40} color="#555555" />
        <p className="text-sm">{pickedImage ? "사진 변경" : "사진 업로드"}</p>
      </button>
      {pickedImage && (
        <div className="ml-3 w-24 h-24 relative">
          <Image
            src={pickedImage}
            alt="pickedImage"
            fill
            className="rounded-lg"
          />
          <div
            className="bg-black text-white w-5 h-5 absolute -top-2 -right-2 font-light text-xs flex justify-center items-center rounded-full"
            onClick={handleDeleteImage}
          >
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
