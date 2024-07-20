"use client";
import Image from "next/image";
import React, { ChangeEventHandler, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const imageRef = useRef(null);

  const handleImageChage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];
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
    setPickedImage(null)
  }
  return (
    <div>
      {pickedImage ? (
        <div className="w-24 h-24 relative">
          <Image
            src={pickedImage}
            alt="pickedImage"
            fill
            className="rounded-lg"
          />
          <div className="bg-black text-white w-5 h-5 absolute -top-2 -right-2 font-light text-xs flex justify-center items-center rounded-full"
          onClick={handleDeleteImage}>X</div>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="inputImage"
            ref={imageRef}
            onChange={handleImageChage}
            required
            className="hidden"
          />
          <button
            type="button"
            onClick={handlePickClick}
            className="w-24 h-24 border-[1px] flex flex-col justify-center items-center rounded-lg"
          >
            <CiCamera size={40} color="#555555" />
            <p className="text-sm">사진 업로드</p>
          </button>
        </>
      )}
    </div>
  );
};

export default ImagePicker;
