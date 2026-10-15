"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, AdvertisementData, CategoryData } from "@/lib/api";
import { PurchaseCard } from "@/components/tutors/PurchaseCard";
import { AdvertisementDetailsModal } from "@/components/tutors/AdvertisementDetailsModal";
import { Tutor, TutorCard } from "@/components/tutors/TutorCard";

export const TutorListingSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [tutors, setTutors] = useState<AdvertisementData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModalTutor, setActiveModalTutor] = useState<AdvertisementData | null>(null);
  const [activeDetailsTutor, setActiveDetailsTutor] = useState<AdvertisementData | null>(null);

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
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#1d4ed8] mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d4ed8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1d4ed8]"></span>
              </span>
              Featured Tutors
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
              Eduride Community <br className="hidden sm:inline" />Tutors
            </h2>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal direction="up" distance={20} delay={100}>
          <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
            const mappedTutor: Tutor = {
              id: tutor.id,
              name: tutor.title || tutor.user?.name || "Tutor",
              category: tutor.category?.name || "General",
              image: "/tutors/t1.png",
              location: tutor.location?.name || tutor.city || "Online",
              isCommunity: tutor.type === "community",
              gradeLevel: Array.isArray(tutor.education_level)
                ? tutor.education_level.join(", ")
                : tutor.education_level || "Any level",
              experience: tutor.experience || "Not specified",
              mode: tutor.teaching_mode || "Flexible",
              rate: tutor.fee_min
                ? `AED ${tutor.fee_min}${tutor.fee_type ? `/${tutor.fee_type.replace("per ", "")}` : ""}`
                : "Negotiable",
              description: tutor.description || null,
            };

            return (
              <ScrollReveal key={tutor.id} direction="up" delay={100 + idx * 60}>
                <TutorCard
                  tutor={mappedTutor}
                  onViewProfile={() => setActiveModalTutor(tutor)}
                  onViewDetails={() => setActiveDetailsTutor(tutor)}
                />
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
            item={{
              contactName: activeModalTutor.contact_name || "",
              contactPhone: activeModalTutor.contact_phone || "",
              contactEmail: activeModalTutor.contact_email || "",
              rawAd: activeModalTutor,
            }}
            type="tutor"
            title="Unlock Direct Tutor Contacts"
            description="Get instant access to verified tutor phone numbers and connect immediately with our single plan for all class levels."
            onClose={() => setActiveModalTutor(null)}
          />
        )}
        {activeDetailsTutor && (
          <AdvertisementDetailsModal
            advertisement={activeDetailsTutor}
            type="tutor"
            onClose={() => setActiveDetailsTutor(null)}
          />
        )}
      </div>
    </section>
  );
};
