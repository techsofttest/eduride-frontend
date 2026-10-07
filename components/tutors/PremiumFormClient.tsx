"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { RequestSuccessModal } from "@/components/tutors/RequestSuccessModal";

const carouselImages = [
  {
    src: "/tutor-banner/tutor3.png",
    alt: "Expert Tutors EduRide",
  },
  {
    src: "/about-home/a1.png",
    alt: "EduRide Learning Platform",
  },
];

export const PremiumFormClient: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Dubai",
    subjectOrRequirement: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full">
      <ScrollReveal direction="up" distance={15}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#2563eb] transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-bold">Premium Access</span>
          </nav>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Full Background Carousel Bleeding to Left Edge */}
          <div className="lg:col-span-6 lg:sticky lg:top-8 relative min-h-[500px] sm:min-h-[600px] lg:min-h-[95vh] rounded-none overflow-hidden flex flex-col justify-end p-8 sm:p-12 text-white bg-slate-900 group">
            {/* Background Carousel Images */}
            {carouselImages.map((img, idx) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
                  }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={idx === 0}
                />
                {/* Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
              </div>
            ))}

            {/* Foreground Header Content aligned to bottom */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 backdrop-blur-md text-blue-200 text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full bg-slate-900/40 border border-white/10">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium Member Registration
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Get Direct Verified Contacts
              </h1>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-6 px-4 sm:px-6 lg:px-20 lg:pl-0 flex flex-col justify-center py-6 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-5">

              <p className="text-sm sm:text-2xl text-slate-900 font-medium leading-relaxed mb-12">
                Fill in your basic information below.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* UAE City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    UAE City / Emirate *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-300 rounded-sm px-4 py-3 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                  </select>
                </div>
              </div>

              {/* Payment Info Box */}
              <div className="flex items-center justify-between gap-4 mt-12">
                <div>
                  <span className="text-md font-bold text-slate-900 block">
                    Premium Access Fee
                  </span>
                  <span className="text-sm text-slate-700 font-medium">
                    Unlock up to 10 verified contacts via EduRide Admin
                  </span>
                </div>
                <span className="text-2xl font-bold text-[#2563eb] shrink-0">
                  AED 49
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-4 text-base font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer active:scale-[0.98]"
              >
                Proceed &amp; Confirm Premium Request (AED 49)
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>

      {/* Confirmation Modal */}
      {isSubmitted && (
        <RequestSuccessModal
          fullName={formData.fullName}
          phone={formData.phone}
          onClose={() => setIsSubmitted(false)}
        />
      )}
    </div>
  );
};

