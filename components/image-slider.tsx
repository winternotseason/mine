"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/main-ad.jpg", "/main-ad2.jpg", "/main-ad3.jpg"];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <Image fill src={images[currentIndex]} alt="ad image" />
  );
};

export default ImageSlider;
