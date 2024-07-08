"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Autoplay } from "swiper/modules";
import { goods } from "@/lib/goods";
import Image from "next/image";
import classes from "./today-goods-slider.module.css";

const TodayGoodsSlider = () => {
  
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="today-swiper"
      >
        {goods.map((item) => (
          <SwiperSlide key={item.title} className={classes.slide}>
            <div className={classes.goods}>
              <div className={classes.image}>
                <Image src={item.src} fill alt={item.title} priority/>
              </div>
              <div className={classes.description}>
                <div className={classes.goodsName}>{item.title}</div>
                <div className={classes.goodsPrice}>{item.price}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TodayGoodsSlider;
