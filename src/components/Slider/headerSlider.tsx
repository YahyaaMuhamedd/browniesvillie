"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { slideImages, sliderOptions } from './sliderOption';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



const SwipperSlider: React.FC = () => (
    <div className="w-full mx-auto bg-white ">
        <h1 className="heading"></h1>
        <Swiper {...sliderOptions}  >
            {slideImages.map((image, index) => (
                <SwiperSlide key={index} className="bg-center bg-cover h-full">
                    <Image
                        src={image}
                        alt={`Slide ${index + 1}`}
                        width={300}
                        height={300}
                        priority
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            ))}

            <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow"></div>
                <div className="swiper-button-next slider-arrow"></div>
                <div className="swiper-pagination"></div>
            </div>
        </Swiper>
    </div>
);

export default SwipperSlider;
