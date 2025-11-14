import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BgImage from "../assets/background_01.jpg";
import rightSideImg from "../assets/background_transparent_01.png";
import service1 from "../assets/home-cleaning.jpg";
import service2 from "../assets/office-deep-cleaning.png";
import service3 from "../assets/RESIDENTIAL PLUMBING.jpg";

function MySlider() {
  const navigate = useNavigate();

  const slides = [
    {
      img: service1,
      title: "Home Cleaning",
      desc: "Professional home cleaning services for a spotless living space.",
    },
    {
      img: service2,
      title: "Office Deep Cleaning",
      desc: "Keep your office environment clean, fresh, and hygienic.",
    },
    {
      img: service3,
      title: "Residential Plumbing",
      desc: "Expert plumbing solutions for homes with fast and reliable service.",
    },
  ];

  return (
    <div
      className="
        w-full min-h-[85vh] 
        flex flex-col lg:flex-row 
        items-end justify-between 
        bg-cover bg-center
        px-4 sm:px-8 lg:px-16
      "
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* LEFT SECTION */}
      <div className="w-full lg:w-2/3 py-6 lg:py-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex items-end justify-center">
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    w-[90%] sm:w-[80%] 
                    h-full object-cover 
                    rounded-2xl shadow-lg
                  "
                />

                {/* TEXT OVERLAY */}
                <div
                  className="
                    absolute bottom-0 
                    w-[90%] sm:w-[80%] 
                    bg-black/60 text-white 
                    p-4 sm:p-5 
                    rounded-b-2xl
                    flex flex-col gap-2
                  "
                >
                  <h3 className="text-base sm:text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base">{item.desc}</p>

                  <button
                    onClick={() => navigate("/services")}
                    className="
                      bg-[#51ACFB] hover:bg-blue-600 
                      text-white px-4 py-2 
                      rounded-md w-max cursor-pointer
                      text-sm sm:text-base
                    "
                  >
                    Explore
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT SECTION (DESKTOP ONLY) */}
      <div className="hidden lg:flex w-1/3 h-full items-center justify-center">
        <img
          src={rightSideImg}
          alt="Promo"
          className="max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}

export default MySlider;
