"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, WhatWeOfferData } from "@/lib/api";

const getIconForTitle = (title: string, index: number) => {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes("verify") || lowercaseTitle.includes("profile")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (lowercaseTitle.includes("flex") || lowercaseTitle.includes("learn") || lowercaseTitle.includes("schedule")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (lowercaseTitle.includes("diverse") || lowercaseTitle.includes("education") || lowercaseTitle.includes("degree")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    );
  }
  if (lowercaseTitle.includes("subject") || lowercaseTitle.includes("support")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  if (lowercaseTitle.includes("reward") || lowercaseTitle.includes("special")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (lowercaseTitle.includes("contact") || lowercaseTitle.includes("direct")) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    );
  }
  // Default fallback icon
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
};

const defaultBgColors = [
  "bg-[#2563eb]",
  "bg-[#0EA5E9]",
  "bg-[#8B5CF6]",
  "bg-[#F97316]",
  "bg-[#10B981]",
  "bg-[#06B6D4]",
];

export const TrustStatsSection: React.FC = () => {
  const [offerItems, setOfferItems] = useState<WhatWeOfferData[]>([]);

  useEffect(() => {
    async function loadOffers() {
      const data = await api.getWhatWeOffer();
      if (data) {
        setOfferItems(data);
      }
    }
    loadOffers();
  }, []);

  if (!offerItems || offerItems.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#2563eb] mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
              </span>
              Our Services
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              What We Offer
            </h2>
          </div>
        </ScrollReveal>

        {/* Container Box (on Blue Background) */}
        <ScrollReveal direction="up" distance={40} delay={100}>
          <div className="relative overflow-hidden rounded-3xl bg-[#2563eb] p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-[#2563eb]/20">

            {/* Decorative Background Elements */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-48 h-64 rounded-full bg-white/15 blur-sm pointer-events-none hidden lg:block" />
            <div className="absolute top-2/3 -right-16 -translate-y-1/2 w-48 h-64 rounded-full bg-white/15 blur-sm pointer-events-none hidden lg:block" />

            {/* Grid Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {offerItems.map((item, index) => {
                const iconBgClass = item.icon_bg || defaultBgColors[index % defaultBgColors.length];
                return (
                  <ScrollReveal key={item.id} delay={index * 80} direction="up">
                    <div className="group h-full flex flex-col justify-between p-8 sm:p-9 rounded-2xl bg-white text-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                      <div>
                        {/* Icon Badge */}
                        <div className={`w-14 h-14 rounded-2xl ${iconBgClass} text-white flex items-center justify-center mb-6 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {getIconForTitle(item.title, index)}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 mb-3">
                          {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p className="text-sm sm:text-[15px] font-medium text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
