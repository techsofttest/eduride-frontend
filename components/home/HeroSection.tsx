"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { api, HomeBannerData } from "@/lib/api";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const fallbackSlides: HomeBannerData[] = [
  {
    id: 1,
    title: "Learn. Grow. Succeed.",
    subtitle: null,
    description:
      "Find qualified tutors, LSAs, Islamic educators, medical educators, and chess coaches.",
    button_text: "Find Your Tutor",
    button_url: "#tutors",
  },
  {
    id: 2,
    title: "Connect, Teach, and Inspire the Next Generation.",
    subtitle: "Empowering Educators",
    description: "Connect with students worldwide.",
    button_text: "Become a Tutor",
    button_url: "/post-ad",
  },
];

export const HeroSection: React.FC = () => {
  const [banners, setBanners] = useState<HomeBannerData[]>(fallbackSlides);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadBanners() {
      const data = await api.getHomeBanners();
      if (data && data.length > 0) {
        setBanners(data);
      }
      setLoaded(true);
    }
    loadBanners();
  }, []);

  return (
    <section id="home" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 min-h-[80vh] flex items-center justify-center text-white">
      {/* Background Video (Kept Static) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src="/home-hero/b3.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />

      {/* Hero Content Carousel */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 w-full">
        {banners.length > 0 && (
          <Swiper
            key={banners.length}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={banners.length > 1}
            speed={700}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "!bg-[#2563eb] !w-8 !rounded-full",
              bulletClass:
                "inline-block w-1 h-1 bg-white/50 rounded-full mx-1 cursor-pointer transition-all duration-300 hover:bg-white",
            }}
            navigation={{
              nextEl: ".hero-swiper-button-next",
              prevEl: ".hero-swiper-button-prev",
            }}
            className="hero-swiper !pb-12"
          >
            {banners.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="mx-auto max-w-3xl text-center py-4 sm:py-6">
                  {/* Subtitle / Badge */}
                  {slide.subtitle && (
                    <div className="mb-3 inline-block">
                      <span className="inline-block px-3.5 py-1 rounded-full text-md font-semibold tracking-wider border bg-white/10 text-white border-white/10">
                        {slide.subtitle}
                      </span>
                    </div>
                  )}

                  {/* Title / Headline */}
                  {slide.title && (
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                      {slide.title}
                    </h1>
                  )}

                  {/* Subtext / Description */}
                  {slide.description && (
                    <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium max-w-2xl mx-auto mb-6">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Action Button */}
                  {slide.button_text && (
                    <div>
                      <a
                        href={slide.button_url || "#"}
                        className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm sm:text-base font-bold transition-all active:scale-[0.98] bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-black/10"
                      >
                        {slide.button_text + " →"}
                      </a>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Custom Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              aria-label="Previous Slide"
              className="hero-swiper-button-prev absolute left-0 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer p-2 flex items-center justify-center hover:scale-110"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              aria-label="Next Slide"
              className="hero-swiper-button-next absolute right-0 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer p-2 flex items-center justify-center hover:scale-110"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
};



