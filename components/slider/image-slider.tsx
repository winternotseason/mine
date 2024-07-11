"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import classes from "./image-slider.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { ads } from "@/lib/main-ad";

const ImageSlider = () => {
  const [swiper, setSwiper] = useState<any>();

  const handleNext = () => {
    swiper?.slideNext();
  };
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSwiper={(e) => {
        setSwiper(e);
      }}
      loop={true}
      navigation={{
        nextEl: ".swiperNextButton",
        prevEl: ".swiperPrevButton",
      }}
      modules={[Autoplay, Navigation]}
      className={classes.swiper}
    >
      {ads.map((item) => (
        <SwiperSlide className={classes.adBox} key={item.main}>
          <div className={classes.adImageContainer}>
            <Image src={item.src} alt={item.main} fill />
          </div>
          <div className={classes.adText}>
            <p>{item.sub}</p>
            <center>
              <p>{item.main}</p>
            </center>
          </div>
        </SwiperSlide>
      ))}
      <div onClick={handleNext} className={classes.swiperNextButton}>
        <SlArrowRight color="#ffffff" size={60} />
      </div>
      <div onClick={handlePrev} className={classes.swiperPrevButton}>
        <SlArrowLeft color="#ffffff" size={60} />
      </div>
    </Swiper>
  );
};

export default ImageSlider;
