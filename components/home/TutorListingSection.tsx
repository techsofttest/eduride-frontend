"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, AdvertisementData, CategoryData } from "@/lib/api";
import { PurchaseCard } from "@/components/tutors/PurchaseCard";

export const TutorListingSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [tutors, setTutors] = useState<AdvertisementData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModalTutor, setActiveModalTutor] = useState<AdvertisementData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [adsRes, catsRes] = await Promise.all([
          api.getAdvertisements({ type: "tutor" }),
          api.getCategories(),
        ]);

        if (adsRes && adsRes.data) {
          setTutors(adsRes.data);
        }
        if (catsRes) {
          setCategories(catsRes);
        }
      } catch (error) {
        console.error("Failed to load tutors data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (tutors.length === 0) {
    return null; // Do not render section if there are no tutors
  }

  const categoryNames = ["All", ...categories.map((c) => c.name)];

  const filteredTutors =
    activeFilter === "All"
      ? tutors
      : tutors.filter((tutor) => tutor.category?.name === activeFilter);

  return (
    <section id="tutors" className="py-16 sm:py-24 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#1d4ed8] mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d4ed8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1d4ed8]"></span>
              </span>
              Featured Tutors
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
              Eduride Community <br />Tutors
            </h2>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal direction="up" distance={20} delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-[#2563eb] text-white shadow-sm border border-[#2563eb]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-y-10 lg:gap-y-10 items-stretch">
          {filteredTutors.map((tutor, idx) => {
            const locationStr = tutor.location?.name || tutor.city || "Online";
            const rateStr = tutor.fee_min ? `AED ${Number(tutor.fee_min).toString()}${tutor.fee_type ? `/${tutor.fee_type.replace('per ', '')}` : ''}` : "Negotiable";
            
            const formatTeachingMode = (mode?: string | null) => {
              if (!mode) return "Flexible";
              switch (mode.toLowerCase()) {
                case 'online': return 'Online Tuition';
                case 'home': return 'Home Tuition';
                case 'centre': return 'Centre Tuition';
                case 'online_home': return 'Online & Home Tuition';
                default: return mode.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              }
            };

            return (
              <ScrollReveal key={tutor.id} direction="up" delay={100 + idx * 60}>
                <div className="h-full rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  <div>
                    {/* Top Card Header with Light Blue Background */}
                    <div className="p-5 sm:p-6 bg-[#eff6ff] border-b border-blue-100/80">
                      {/* Top Row*/}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                          <svg className="w-5.5 h-5.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-800 truncate max-w-[60%] text-right">
                          <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{locationStr}</span>
                        </span>
                      </div>

                      {/* Name / Title */}
                      <h3 className="text-lg sm:text-lg font-bold text-slate-950 leading-snug group-hover:text-[#2563eb] transition-colors mb-2 truncate">
                        {tutor.title || tutor.user?.name || "Tutor"}
                      </h3>

                      {/* Category with Open Book Icon */}
                      <div className="flex items-center gap-2 text-sm font-medium text-[#475569]">
                        <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="truncate">{tutor.category?.name || "General"}</span>
                      </div>
                    </div>

                    {/* Middle Details: Experience, Grade/Level & Mode */}
                    <div className="p-5 sm:p-6 space-y-3 text-sm font-medium text-[#334155]">
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="truncate">{tutor.experience || "Not specified"}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="truncate">{tutor.education_level || "Any level"}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{formatTeachingMode(tutor.teaching_mode)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Rate + View Profile Button */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex flex-row items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <span className="text-sm sm:text-base font-bold text-slate-950 truncate whitespace-nowrap">{rateStr}</span>

                    <a
                      href={tutor.slug ? `/find-tutor` : `/find-tutor`}
                      onClick={(e) => {
                        if (tutor.slug) {
                          // Allow navigation to find-tutor page
                        } else {
                          e.preventDefault();
                          setActiveModalTutor(tutor);
                        }
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm shadow-[#2563eb]/20 shrink-0 cursor-pointer"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="/find-tutor"
            className="inline-flex items-center justify-center rounded-xl bg-black hover:bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95"
          >
            Explore All Tutor Profiles &rarr;
          </a>
        </div>

        {/* Interactive Unlock Purchase Modal */}
        {activeModalTutor && (
          <PurchaseCard
            onClose={() => setActiveModalTutor(null)}
          />
        )}
      </div>
    </section>
  );
};
