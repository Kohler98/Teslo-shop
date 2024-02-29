"use client";
 
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

 
import "./slideShow.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
 
  return (
    <div className={className}>
      <Swiper
        // style={
        //   {
        //     "--swiper-navigation-color": "#fff",
        //     "--swiper-pagination-color": "#fff",
        //   } as React.CSSProperties
        // }
        style={{
          width:'100vw',
          height:'500px'
        }}
        pagination
 
        autoplay={{
            delay:2500
        }}
        modules={[FreeMode, Autoplay,Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              alt={title}
              src={`/products/${image}`}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
