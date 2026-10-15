"use client";

import React, { useState, useEffect } from "react";
import { TutorCard, Tutor } from "@/components/tutors/TutorCard";
import { TutorFilterBar } from "@/components/tutors/TutorFilterBar";
import { PurchaseCard } from "@/components/tutors/PurchaseCard";
import { AdvertisementDetailsModal } from "@/components/tutors/AdvertisementDetailsModal";
import { Pagination } from "@/components/ui/Pagination";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, AdvertisementData, CategoryData } from "@/lib/api";

interface TutorDirectoryClientProps {
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 12;

export const TutorDirectoryClient: React.FC<TutorDirectoryClientProps> = ({ initialCategory }) => {
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>(initialCategory || "All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalTutor, setActiveModalTutor] = useState<Tutor | null>(null);
  const [activeDetailsTutor, setActiveDetailsTutor] = useState<AdvertisementData | null>(null);

  const [tutors, setTutors] = useState<AdvertisementData[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
  const [countriesList, setCountriesList] = useState<{id: number, name: string}[]>([]);
  const [teachingModesList, setTeachingModesList] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Whenever filters change, reset to page 1
  const handleCategoryChange = (val: string) => {
    setSelectedCategoryValue(val);
    setCurrentPage(1);
  };

  const handleCountryChange = (val: string) => {
    setSelectedCountry(val);
    setCurrentPage(1);
  };

  const handleModeChange = (val: string) => {
    setSelectedMode(val);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [adsRes, catsRes, modesRes, countriesRes] = await Promise.all([
          api.getAdvertisements({ type: "tutor" }),
          api.getCategories(),
          api.getTeachingModes(),
          api.getCountries(),
        ]);

        if (adsRes && adsRes.data) {
          setTutors(adsRes.data);
        }
        if (catsRes) {
          setCategoriesList(catsRes);
        }
        if (modesRes) {
          setTeachingModesList(modesRes);
        }
        if (countriesRes) {
          setCountriesList(countriesRes);
        }
      } catch (error) {
        console.error("Failed to fetch tutors data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = ["All", ...categoriesList.map((c) => c.name)];
  const selectedCategory =
    categoriesList.find(
      (item) => item.slug === selectedCategoryValue || item.name === selectedCategoryValue
    )?.name || (categoriesList.length > 0 && selectedCategoryValue !== "All" ? "All" : selectedCategoryValue);
  const countries = ["All", ...countriesList.map((c) => c.name)];
  const modes = ["All", ...teachingModesList.map((m) => m.name)];

  // Filtering Logic
  const filteredTutors = tutors.filter((tutor) => {
    const tutorCategory = tutor.category?.name || "General";
    const tutorMode = tutor.teaching_mode || "";
    
    // Country matching
    const selectedCountryData = countriesList.find(c => c.name === selectedCountry);
    const matchCountry = selectedCountry === "All" || (
      selectedCountryData &&
      (tutor.country === selectedCountry || tutor.location?.country_id === selectedCountryData.id)
    );

    const matchCategory =
      selectedCategory === "All" || tutorCategory === selectedCategory;
    const matchMode =
      selectedMode === "All" ||
      tutorMode.toLowerCase().includes(selectedMode.replace(" Tuition", "").replace(" tuition", "").toLowerCase());
    return matchCountry && matchCategory && matchMode;
  });

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedCountry !== "All" ||
    selectedMode !== "All";

  const handleResetFilters = () => {
    setSelectedCategoryValue("All");
    setSelectedCountry("All");
    setSelectedMode("All");
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredTutors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTutors = filteredTutors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("tutor-results-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="pb-8 sm:pb-12 bg-white text-slate-950 relative">
      <TutorFilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        selectedMode={selectedMode}
        setSelectedMode={handleModeChange}
        hasActiveFilters={hasActiveFilters}
        handleResetFilters={handleResetFilters}
        categories={categories}
        countries={countries}
        modes={modes}
      />

      <div id="tutor-results-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        {/* Results Counter */}
        <div className="flex items-center justify-between gap-4 mb-6 px-1">
          <div className="flex items-center gap-2 text-xs sm:text-base font-bold text-slate-900">
            <span>Showing</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-[#2563eb] font-extrabold text-xs sm:text-sm">
              {filteredTutors.length > 0
                ? `${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, filteredTutors.length)}`
                : 0}
            </span>
            <span>of {filteredTutors.length} Verified Tutor Profiles</span>
          </div>
        </div>

        {/* 3-Column / 4-Column Grid of Tutor Cards */}
        {!loading && paginatedTutors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10 lg:gap-y-10 items-stretch">
              {paginatedTutors.map((tutor, idx) => {
                const mappedTutor = {
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
                  rate: tutor.fee_min ? `AED ${tutor.fee_min}${tutor.fee_type ? '/' + tutor.fee_type.replace('per ', '') : ''}` : "Negotiable",
                  description: tutor.description || null,
                  contactName: tutor.contact_name || "",
                  contactPhone: tutor.contact_phone || "",
                  contactEmail: tutor.contact_email || "",
                  rawAd: tutor,
                };

                return (
                  <ScrollReveal key={tutor.id} direction="up" delay={Math.min(250, 40 + idx * 30)}>
                    <TutorCard
                      tutor={mappedTutor}
                      onViewProfile={() => setActiveModalTutor(mappedTutor)}
                      onViewDetails={() => setActiveDetailsTutor(tutor)}
                    />
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : !loading && filteredTutors.length === 0 ? (
          /* Empty State when zero match */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Tutors Match Your Selected Filters</h3>
            <p className="text-sm font-medium text-slate-600 max-w-md mx-auto mb-6">
              Try adjusting your category, city location, or learning mode selection to see available educators.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] text-white px-6 py-3 text-sm font-bold shadow-md hover:bg-[#1d4ed8] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
           <div className="flex justify-center py-12"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div></div>
        )}

        {/* Interactive Parent Modal */}
        {activeModalTutor && (
          <PurchaseCard
            item={activeModalTutor}
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
