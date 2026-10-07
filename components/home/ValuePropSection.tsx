"use client";

import React from "react";

export const ValuePropSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#fafbfc]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#d91b48] mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3b68] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff3b68]"></span>
            </span>
            About Us
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            More than just <span className="text-[#ff3b68]">education</span> — creating opportunities &amp; helping every learner grow.
          </h2>
        </div>

        {/* 3-Card Grid Matching HowItWorks Design */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 items-stretch">

          {/* Card 1: Expert Guidance */}
          <div className="relative overflow-hidden rounded-[36px] bg-white p-9 sm:p-10 border border-slate-100 text-slate-900 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 md:-rotate-1">
            {/* Decorative Rose Background Circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ff3b68]/10 pointer-events-none" />
            <div className="absolute -bottom-14 -left-12 w-52 h-52 rounded-full bg-[#ff3b68]/10 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Expert Guidance
              </h3>
              <p className="mt-3 text-base text-slate-700 leading-relaxed font-medium">
                From day one, connect with qualified tutors and LSAs who motivate, challenge, and support your exact learning needs.
              </p>
            </div>

            {/* Bottom Graphic Mock */}
            <div className="relative z-10 mt-8 rounded-2xl bg-[#fff0f4] p-4 border border-slate-200">
              <div className="bg-white rounded-xl p-3.5 flex items-center gap-3 border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
                  alt="Tutor profile"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-slate-900">Expert Tutor</h4>
                    <span className="text-xs font-bold text-amber-500">★ 4.9</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">School &amp; LSA Support</p>
                </div>
              </div>
              <div className="mt-2.5 bg-white/90 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#ff3b68]" />
                Real Support. Real Progress.
              </div>
            </div>
          </div>

          {/* Card 2: Flexible Learning (Distorted upward with rotation, white bg with rose circles) */}
          <div className="relative overflow-hidden rounded-[36px] bg-white p-9 sm:p-10 border border-slate-100 text-slate-900 flex flex-col justify-between md:-translate-y-8 md:rotate-2 hover:-translate-y-10 transition-all duration-300 z-10">
            {/* Decorative Rose Background Circles */}
            <div className="absolute -top-14 -left-14 w-56 h-56 rounded-full bg-[#ff3b68]/15 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#ff3b68]/15 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Flexible Learning
              </h3>
              <p className="mt-3 text-base text-slate-700 leading-relaxed font-medium">
                Your pace, your path. Tailor every lesson to your schedule so progress feels personal from the very beginning.
              </p>
            </div>

            {/* Bottom Graphic Mock */}
            <div className="relative z-10 mt-8 overflow-hidden rounded-2xl h-44 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Interactive learning session"
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Card 3: Support & Career Growth */}
          <div className="relative overflow-hidden rounded-[36px] bg-white p-9 sm:p-10 border border-slate-100 text-slate-900 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 md:-rotate-1">
            {/* Decorative Rose Background Circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ff3b68]/10 pointer-events-none" />
            <div className="absolute -bottom-14 -left-12 w-52 h-52 rounded-full bg-[#ff3b68]/10 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Support &amp; Growth
              </h3>
              <p className="mt-3 text-base text-slate-700 leading-relaxed font-medium">
                You&apos;re never alone. Build lasting confidence, career-focused skills, and unlock real opportunities every week.
              </p>
            </div>

            {/* Bottom Graphic Mock */}
            <div className="relative z-10 mt-8 overflow-hidden rounded-2xl h-44 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Career development and student success"
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
