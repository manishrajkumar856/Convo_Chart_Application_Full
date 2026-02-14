import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { Link } from "react-router-dom";
import { BsPeople } from "react-icons/bs";

const Slider1 = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
    {
      breakpoint: 1280, // large screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024, // tablets landscape
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // tablets portrait
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600, // small phones
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 400, // very small devices
      settings: {
        slidesToShow: 1,
        dots: false, // optional: hide dots on tiny screens
      },
    },
  ],
};


  return (
    <div className="relative mt-15  z-10 w-full flex flex-col bg-white px-5 md:px-10 py-8 rounded-2xl">
      <div className="text-xl mb-3 font-semibold flex items-center justify-start gap-2"><BsPeople className="text-2xl font-semibold"/> People you might know</div>
      <Slider {...settings}>{children}</Slider>
      <div className="w-full hover:opacity-80 flex items-center justify-end  mt-5 text-sm font-medium text-[#3369cc]">
        <Link to="/people">See more</Link>
      </div>
    </div>
  );
};

export default Slider1;
