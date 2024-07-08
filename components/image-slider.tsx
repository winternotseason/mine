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
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import classes from "./image-slider.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { ads } from "@/lib/main-ad";

const ImageSlider = () => {
  const [swiper, setSwiper] = useState<any>();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, timeLeft: number, progress: any) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(timeLeft / 1000)}s`;
  };

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true); // 컴포넌트가 렌더링되면 isReady 상태를 true로 설정
  }, []);
  const handleNext = () => {
    swiper?.slideNext();
  };
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  return (
    <>
      {isReady && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          centeredSlides={true}
          parallax={true}
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
          onAutoplayTimeLeft={onAutoplayTimeLeft}
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
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
          <div onClick={handleNext} className={classes.swiperNextButton}>
            <SlArrowRight color="#ffffff" size={60} />
          </div>
          <div onClick={handlePrev} className={classes.swiperPrevButton}>
            <SlArrowLeft color="#ffffff" size={60} />
          </div>
        </Swiper>
      )}
    </>
  );
};

export default ImageSlider;
