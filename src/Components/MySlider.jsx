import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BgImage from "../assets/background_01.jpg";
import rightSideImg from "../assets/background_transparent_01.png";
import service1 from "../assets/image_service_01.jpg";
import service2 from "../assets/image_service_02.jpg";
import service3 from "../assets/image_service_03.jpg";

function MySlider() {
  const slides = [
    {
      img: service1,
      title: "OUTDOOR TOYS",
      desc: "All That Your Child Wish For",
      price: "Starts @ $5.00",
    },
    {
      img: service2,
      title: "UP TO 50% OFF",
      desc: "Colorful Friction Powered Toys",
      price: "Grab your favorite today!",
    },
    {
      img: service3,
      title: "UP TO 30% OFF",
      desc: "Let’s Improve Kids Motor Skills",
      price: "Only $15.55❤",
    },
  ];

  return (
    <div
      className="w-full h-[90vh] flex items-end justify-between bg-cover bg-center px-6 lg:px-16"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      {/* LEFT SIDE - SLIDER */}
      <div className="w-full lg:w-2/3 pb-1"> {/* pb-8 for bottom placement */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[75vh]" // increased height
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              {/* IMAGE + TEXT SAME CONTAINER */}
              <div className="relative w-full h-[75vh] flex items-end justify-center">
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[80%] h-full object-cover rounded-2xl shadow-lg"
                />

                {/* Text overlay below image */}
                <div className="absolute bottom-0 w-[80%] bg-black/60 text-white p-5 rounded-b-2xl">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <h2 className="text-3xl font-bold leading-snug">{item.desc}</h2>
                  <p className="text-lg mt-1">{item.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT SIDE - FIXED IMAGE */}
      <div className="hidden lg:flex w-1/3 h-full items-center justify-center">
        <img
          src={rightSideImg}
          alt="Promo"
          className="max-h-full object-contain"
        />
      </div>
    </div>
  );
}

export default MySlider;
