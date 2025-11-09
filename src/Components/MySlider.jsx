import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const MySlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/3rphMjK/electrician.jpg",
      title: "Find Expert Electricians Near You",
      desc: "Get quick and trusted help from certified electricians for all your home needs.",
    },
    {
      id: 2,
      image: "https://i.ibb.co/S6H0B0J/plumber.jpg",
      title: "Reliable Plumbing Services",
      desc: "Fix leaks, install fittings, and get expert plumbing assistance anytime, anywhere.",
    },
    {
      id: 3,
      image: "https://i.ibb.co/vdZJHbL/cleaning.jpg",
      title: "Professional Home Cleaning",
      desc: "Book experienced cleaners to keep your home fresh and spotless effortlessly.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* slide text */}
              <div className="relative text-center text-white px-6 md:px-12 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  {slide.desc}
                </p>
                <Link
                  to="/services"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySlider;
