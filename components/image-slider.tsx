"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/main-ad.png", "/main-ad2.png", "/main-ad3.png"];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <Image width={380} height={247} src={images[currentIndex]} alt="ad image" />
  );
};

export default ImageSlider;
