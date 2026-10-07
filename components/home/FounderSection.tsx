"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, CmsPageData } from "@/lib/api";

const defaultFounderData: CmsPageData = {
  id: 0,
  title: "Jaseera Thahseer",
  slug: "meet-the-founder",
  badge_text: "Meet The Founder",
  subtitle: "“Build students today for a better society tomorrow.”",
  content: "Jaseera Thahseer is an international Level 7 master-qualified educator and technology enthusiast, with teaching experience from kindergarten to higher secondary, including experience as a Learning Support Assistant (LSA) supporting students with diverse learning needs.",
  button_text: "She founded EduRide to provide fast, verified, and high-quality educational support whenever it is needed.",
  image: "/founder/founder4.png",
};

export const FounderSection: React.FC = () => {
  const [founderData, setFounderData] = useState<CmsPageData>(defaultFounderData);

  useEffect(() => {
    async function loadFounderData() {
      const data = await api.getCmsPage("meet-the-founder");
      if (data) {
        setFounderData(data);
      }
    }
    loadFounderData();
  }, []);

  const imageUrl = founderData.image
    ? founderData.image.startsWith("http")
      ? founderData.image
      : founderData.image.startsWith("/")
        ? founderData.image
        : `http://127.0.0.1:8000/storage/${founderData.image}`
    : "/founder/founder4.png";

  const [part1, part2] = founderData.badge_text ? founderData.badge_text.split(" The ") : ["Meet", "Founder"];

  return (
    <section className="py-16 sm:py-24 bg-white text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Boxed Blue Container */}
        <div className="relative overflow-hidden rounded-3xl bg-[#2563eb] text-white shadow-2xl pt-10 sm:pt-12 lg:pt-12 px-6 sm:px-10 lg:px-12 pb-0">

          {/* Decorative White Background Circles */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-52 h-52 rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute top-8 right-1/3 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">

              {/* Left Text & Glassmorphism Details (Col 7) */}
              <div className="lg:col-span-7 space-y-8 pt-4">
                <ScrollReveal direction="up" distance={30}>
                  <div>
                    <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/95">
                      {part2 ? `${part1} The` : part1}
                    </span>
                    <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mt-1">
                      {part2 || founderData.badge_text}
                    </h2>
                    {founderData.subtitle && (
                      <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold italic text-white/90 tracking-wide font-serif">
                        {founderData.subtitle}
                      </p>
                    )}
                  </div>
                </ScrollReveal>

                {/* Glassmorphic Description Box */}
                {founderData.content && (
                  <ScrollReveal direction="up" distance={30} delay={150}>
                    <div 
                      className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 shadow-xl text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl"
                      dangerouslySetInnerHTML={{ __html: founderData.content }}
                    />
                  </ScrollReveal>
                )}

                {/* Glass Name Pill & Subcaption */}
                <ScrollReveal direction="up" distance={30} delay={300}>
                  <div className="space-y-4 pb-10 sm:pb-12">
                    <div className="inline-block rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 px-8 py-4 shadow-xl">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                        {founderData.title}
                      </span>
                    </div>

                    {founderData.button_text && (
                      <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed font-medium pl-1">
                        {founderData.button_text}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Cutout Image (Col 5) */}
              <div className="lg:col-span-5 flex justify-end items-end p-0 m-0 self-end -mr-6 sm:-mr-10 lg:-mr-12">
                <ScrollReveal direction="up" distance={40} delay={200} className="w-full flex justify-end items-end p-0 m-0">
                  <div className="relative w-full flex justify-center lg:justify-end items-end p-0 m-0">
                    <img
                      src={imageUrl}
                      alt={founderData.title || "Founder"}
                      className="w-auto h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-h-[560px] sm:max-h-[660px] lg:max-h-[760px] xl:max-h-[860px] ml-auto mr-0 block p-0 m-0 leading-none align-bottom scale-105 origin-bottom"
                    />
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
