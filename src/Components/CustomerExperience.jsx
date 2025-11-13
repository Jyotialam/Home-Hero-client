import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import bgImg2 from "../assets/background_03.jpg"

const testimonials = [
  {
    name: "Md Enamul Islam - Savar, Dhaka",
    role: "Yelp Reviewer",
    review:
      "They performed the most comprehensive inspection, and had the most knowledgeable handyman.",
  },
  {
    name: "Akhi Islam Midhu - Gulshan, Dhaka",
    role: "Yelp Reviewer",
    review:
      "Very impressed. They left me with considerable knowledge of our new heating/AC system, and ventilation.",
  },
  {
    name: "MD Atik Hasan - Uttara, Dhaka",
    role: "Yelp Reviewer",
    review:
      "Very impressed. They left me with considerable knowledge of our new heating/AC system, and ventilation.",
  },
  {
    name: "Sheikh A.Sajib - Mirpur, Dhaka",
    role: "Yelp Reviewer",
    review:
      "They cleaned my entire apartment like magic — spotless floors and fresh smell everywhere. Highly recommended!",
  },
  {
    name: "Tangila Khatun - Uttara, Dhaka",
    role: "Yelp Reviewer",
    review:
      "Excellent service! The technician arrived right on time, explained everything clearly, and fixed our AC unit in one visit.",
  },
  {
    name: "Fatema Akter - Ramna, Dhaka",
    role: "Yelp Reviewer",
    review:
      "The carpenter crafted our custom dining table beautifully. Outstanding finish and attention to detail.",
  },
];

export default function CustomerExperience() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat text-white py-20 mt-20"
      style={{
        backgroundImage:
          `url('${bgImg2}')`,
      }}
    >
      <div className="absolute inset-0 bg-blue-900/70"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <h2 className="text-5xl font-bold">
          <span className="text-white">Customer </span>
          <span className="text-blue-300">experience</span>
        </h2>
        <p className="text-lg mt-3 mb-10 text-blue-100">
          Our honorable customers Reviews
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          onSwiper={(swiper) => {
            // navigation refs set হওয়ার পরে swiper-এ assign করা হচ্ছে
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="text-left bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <p className="text-lg leading-relaxed">{t.review}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      fill="#fbbf24"
                      stroke="#fbbf24"
                      className="mr-1"
                    />
                  ))}
                </div>
                <div className="mt-4 text-sm opacity-90">
                  <p className="font-semibold">{t.name}</p>
                  <p>{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div
          ref={prevRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        >
          <ChevronLeft size={36} />
        </div>
        <div
          ref={nextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        >
          <ChevronRight size={36} />
        </div>
      </div>
    </div>
  );
}
