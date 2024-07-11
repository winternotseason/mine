"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import classes from "./mobile-image-slider.module.css";
import { ads } from "@/lib/main-ad";

const MoblieImageSlider = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
      loop={true}
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
    </Swiper>
  );
};

export default MoblieImageSlider;
