"use client";

import React from "react";

export interface Tutor {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  gradeLevel: string;
  experience: string;
  mode: string;
  rate: string;
}

export interface TutorCardProps {
  tutor: Tutor;
  onViewProfile?: (tutor: Tutor) => void;
  className?: string;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onViewProfile,
  className = "",
}) => {
  return (
    <div className={`h-full rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${className}`}>
      <div>
        {/* Top Card Header with Light Blue Background */}
        <div className="p-5 sm:p-6 bg-[#eff6ff] border-b border-blue-100/80">
          <div className="flex items-start gap-3.5">
            {/* Profile / Avatar Icon (Left) */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <svg className="w-5.5 h-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>

            {/* Right Content: Name, Category, and Location */}
            <div className="flex-1 min-w-0">
              {/* Name / Title */}
              <h3 className="text-lg sm:text-lg font-bold text-slate-950 leading-snug group-hover:text-[#2563eb] transition-colors mb-1.5 truncate">
                {tutor.name}
              </h3>

              {/* Category & Location inline */}
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 flex-wrap">
                <div className="flex items-center gap-1 min-w-0">
                  <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="truncate">{tutor.category}</span>
                </div>

                <span className="text-slate-400 font-bold">•</span>

                <div className="flex items-center gap-1 text-slate-700 min-w-0">
                  <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{tutor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Details: Experience, Grade/Level & Mode */}
        <div className="p-5 sm:p-6 space-y-3 text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-slate-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tutor.experience}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-slate-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span>{tutor.gradeLevel}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-slate-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{tutor.mode}</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Rate + View Profile Button */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-md sm:text-md font-bold text-slate-950">{tutor.rate}</span>

        {onViewProfile ? (
          <button
            onClick={() => onViewProfile(tutor)}
            className="inline-flex items-center gap-1.5 justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm shadow-[#2563eb]/20 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <span>Unlock Contact</span>
          </button>
        ) : (
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm shadow-[#2563eb]/20 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <span>Unlock Contact</span>
          </a>
        )}
      </div>
    </div>
  );
};
