"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, CmsPageData } from "@/lib/api";

const defaultParentAd: CmsPageData = {
  id: 0,
  slug: "post-parent-ad",
  title: "Parent Ad Area",
  subtitle: "Post Your Tuition Requirement",
  content: "Tell us what your child needs and connect with suitable tutors.",
  button_text: "Post an ad - Parent \u2192",
  button_url: "#post-parent-ad",
};

const defaultTutorAd: CmsPageData = {
  id: 0,
  slug: "post-tutor-ad",
  title: "Tutor Ad Area",
  subtitle: "Post Your Tutor Profile",
  content: "Tell us your qualifications, experience, subjects, and availability to reach potential students.",
  button_text: "Post an ad - Tutor \u2192",
  button_url: "#post-tutor-ad",
};

export const PostAdCtaSection: React.FC = () => {
  const [parentAd, setParentAd] = useState<CmsPageData>(defaultParentAd);
  const [tutorAd, setTutorAd] = useState<CmsPageData>(defaultTutorAd);

  useEffect(() => {
    async function loadAds() {
      const [parentData, tutorData] = await Promise.all([
        api.getCmsPage("post-parent-ad"),
        api.getCmsPage("post-tutor-ad"),
      ]);

      if (parentData) {
        setParentAd(parentData);
      }
      if (tutorData) {
        setTutorAd(tutorData);
      }
    }
    loadAds();
  }, []);

  return (
    <section id="post-ad" className="py-20 lg:py-28 bg-white text-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#2563eb] mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
              </span>
              Get Started
            </div>

            {/* Quote */}
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold italic tracking-tight text-[#2563eb] leading-snug font-serif">
              “Children must be taught how to think, not what to think.”
            </h2>
            <p className="mt-3 text-base sm:text-lg font-bold text-slate-700 uppercase tracking-widest">
              — Margaret Mead —
            </p>
          </div>
        </ScrollReveal>

        {/* Signature EduRide Royal Blue Container Box */}
        <ScrollReveal direction="up" distance={40} delay={100}>
          <div className="relative overflow-hidden rounded-3xl bg-[#2563eb] p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-[#2563eb]/25 border border-white/10">

            {/* Decorative White Background Circles & Blobs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-48 h-64 rounded-full bg-white/15 blur-sm pointer-events-none hidden lg:block" />

            {/* Subheadline inside Blue Box */}
            <h3 className="relative z-10 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-10 sm:mb-12 max-w-3xl mx-auto">
              Create an Advertisement and Make the Requirement Done.
            </h3>

            {/* 2 Ad Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">

              {/* Card 1: Parent Ad Area */}
              <ScrollReveal direction="up" delay={150}>
                <div className="h-full rounded-3xl bg-white p-8 sm:p-10 text-slate-900 shadow-2xl shadow-black/15 border border-slate-100 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center group">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 border-b-2 border-slate-100 pb-4 inline-block px-4">
                      {parentAd.title}
                    </h4>

                    {/* Parent & Child Icon */}
                    <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-sky-50 flex items-center justify-center text-[#0ea5e9] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="34" cy="30" r="9" fill="#0ea5e9" stroke="none" />
                        <circle cx="68" cy="46" r="7" fill="#0ea5e9" stroke="none" />
                        <path d="M 18 78 C 18 48, 48 42, 54 62 C 58 76, 78 76, 84 58" stroke="#0ea5e9" strokeWidth="5" />
                      </svg>
                    </div>

                    <h5 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                      {parentAd.subtitle}
                    </h5>
                    {parentAd.content && (
                      <div 
                        className="prose prose-sm prose-slate mx-auto mb-8 font-medium max-w-sm"
                        dangerouslySetInnerHTML={{ __html: parentAd.content }}
                      />
                    )}
                  </div>

                  <div>
                    <a
                      href={parentAd.button_url || "#"}
                      className="inline-flex items-center justify-center w-full rounded-2xl bg-[#050505] hover:bg-black text-white font-extrabold py-4 px-6 shadow-xl transition-all duration-200 active:scale-[0.98] hover:scale-105"
                    >
                      {parentAd.button_text}
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 2: Tutor Ad Area */}
              <ScrollReveal direction="up" delay={300}>
                <div className="h-full rounded-3xl bg-white p-8 sm:p-10 text-slate-900 shadow-2xl shadow-black/15 border border-slate-100 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center group">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 border-b-2 border-slate-100 pb-4 inline-block px-4">
                      {tutorAd.title}
                    </h4>

                    {/* Tutor / Graduation Cap & Book Icon */}
                    <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563eb] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Graduation Cap */}
                        <polygon points="50 18, 88 34, 50 50, 12 34" fill="#2563eb" stroke="#2563eb" />
                        <path d="M 26 42 L 26 62 C 26 70, 74 70, 74 62 L 74 42" stroke="#2563eb" strokeWidth="4" />
                        <path d="M 82 37 L 82 65" stroke="#2563eb" strokeWidth="3" />
                        <circle cx="82" cy="67" r="3" fill="#2563eb" />
                        {/* Open Book Base */}
                        <path d="M 20 80 Q 50 72 50 86 Q 50 72 80 80 L 80 88 Q 50 80 50 92 Q 50 80 20 88 Z" fill="none" stroke="#475569" strokeWidth="3" />
                      </svg>
                    </div>

                    <h5 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                      {tutorAd.subtitle}
                    </h5>
                    {tutorAd.content && (
                      <div 
                        className="prose prose-sm prose-slate mx-auto mb-8 font-medium max-w-sm"
                        dangerouslySetInnerHTML={{ __html: tutorAd.content }}
                      />
                    )}
                  </div>

                  <div>
                    <a
                      href={tutorAd.button_url || "#"}
                      className="inline-flex items-center justify-center w-full rounded-2xl bg-[#050505] hover:bg-black text-white font-extrabold py-4 px-6 shadow-xl transition-all duration-200 active:scale-[0.98] hover:scale-105"
                    >
                      {tutorAd.button_text}
                    </a>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
