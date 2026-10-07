"use client";

import React from "react";
import { Tutor } from "@/components/tutors/TutorCard";

export interface TutorProfileModalProps {
  tutor?: Tutor;
  onClose: () => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Big Animated Unlock Icon without Box */}
        <div className="mx-auto mb-5 text-[#2563eb] flex items-center justify-center">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#2563eb] animate-bounce duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug mb-2">
          Unlock Direct Tutor Contacts
        </h3>

        {/* High Conversion Description & Features */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          Get instant access to verified tutor phone numbers and connect immediately with our single plan for all class levels.
        </p>

        <div className="text-left space-y-2 py-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Reveal specific tutor advertisement details</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Unlock up to 10 direct tutor contacts</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Plans designed for every class level</span>
          </div>
        </div>

        {/* Primary & Secondary Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              alert("Redirecting to Premium Purchase...");
            }}
            className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-4 text-sm sm:text-base tracking-wider font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Purchase Premium &bull; AED 49</span>
            <svg className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 text-sm font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


