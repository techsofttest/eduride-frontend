"use client";

import React, { useState, useEffect } from "react";
import { StudentCard, StudentRequirement } from "@/components/students/StudentCard";
import { TutorFilterBar } from "@/components/tutors/TutorFilterBar";
import { PurchaseCard } from "@/components/tutors/PurchaseCard";
import { AdvertisementDetailsModal } from "@/components/tutors/AdvertisementDetailsModal";
import { Pagination } from "@/components/ui/Pagination";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, AdvertisementData, CategoryData } from "@/lib/api";

const ITEMS_PER_PAGE = 12;

export const StudentDirectoryClient: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalStudent, setActiveModalStudent] = useState<any>(null);
  const [activeDetailsStudent, setActiveDetailsStudent] = useState<AdvertisementData | null>(null);

  const [students, setStudents] = useState<AdvertisementData[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
  const [countriesList, setCountriesList] = useState<{id: number, name: string}[]>([]);
  const [teachingModesList, setTeachingModesList] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Whenever filters change, reset to page 1
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
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
          api.getAdvertisements({ type: "student_requirement" }),
          api.getCategories(),
          api.getTeachingModes(),
          api.getCountries(),
        ]);

        if (adsRes && adsRes.data) {
          setStudents(adsRes.data);
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
        console.error("Failed to fetch students data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = ["All", ...categoriesList.map((c) => c.name)];
  const countries = ["All", ...countriesList.map((c) => c.name)];
  const modes = ["All", ...teachingModesList.map((m) => m.name)];

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedCountry !== "All" ||
    selectedMode !== "All";

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSelectedMode("All");
    setCurrentPage(1);
  };

  const filteredStudents = students.filter((student) => {
    const studentCategory = student.category?.name || "General";
    const studentMode = student.teaching_mode || "";
    const selectedCountryData = countriesList.find(c => c.name === selectedCountry);

    if (selectedCountry !== "All" && (
      !selectedCountryData ||
      (student.country !== selectedCountry && student.location?.country_id !== selectedCountryData.id)
    )) {
      return false;
    }
    if (selectedCategory !== "All" && studentCategory !== selectedCategory) {
      return false;
    }
    if (selectedMode !== "All" && !studentMode.toLowerCase().includes(selectedMode.replace(" tuition", "").replace(" Tuition", "").toLowerCase())) {
      return false;
    }
    return true;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("student-results-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="pb-10 bg-slate-50/50">
      {/* Full Width Sticky Filter Bar */}
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

      <div id="student-results-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        {/* Results Header */}
        <div className="flex items-center justify-between gap-4 mb-6 px-1">
          <div className="flex items-center gap-2 text-xs sm:text-base font-bold text-slate-900">
            <span>Showing</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-[#2563eb] font-extrabold text-xs sm:text-sm">
              {filteredStudents.length > 0
                ? `${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)}`
                : 0}
            </span>
            <span>of {filteredStudents.length} Available Student Requirements</span>
          </div>
        </div>

        {/* 3-Column Grid of Student Cards */}
        {!loading && paginatedStudents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10 items-stretch">
              {paginatedStudents.map((student, idx) => {
                const mappedStudent = {
                  id: student.id,
                  title: student.title,
                  grade: Array.isArray(student.education_level)
                    ? student.education_level.join(", ")
                    : student.education_level || "Any level",
                  location: student.location?.name || student.city || "Online",
                  preferredMode: student.teaching_mode || "Flexible",
                  preferredDays: student.preferred_days ? student.preferred_days.join(", ") : "Any day",
                  budget: student.fee_min ? `AED ${student.fee_min}${student.fee_type ? '/' + student.fee_type.replace('per ', '') : ''}` : "Negotiable",
                  category: student.category?.name || "General",
                  contactName: student.contact_name || "",
                  contactPhone: student.contact_phone || "",
                  contactEmail: student.contact_email || "",
                  rawAd: student,
                  description: student.description,
                };

                return (
                  <ScrollReveal key={student.id} direction="up" delay={Math.min(250, 40 + idx * 30)}>
                    <StudentCard
                      student={mappedStudent as any}
                      onUnlockContact={() => setActiveModalStudent(mappedStudent)}
                      onViewDetails={() => setActiveDetailsStudent(student)}
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
        ) : !loading && filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No student requirements found</h3>
            <p className="text-sm text-slate-600">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
           <div className="flex justify-center py-12"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div></div>
        )}

        {/* Modal for Unlocking Student Contacts */}
        {activeModalStudent && (
          <PurchaseCard
            item={activeModalStudent}
            type="student"
            title="Unlock Direct Student Contacts"
            description="Get instant access to verified student & parent contact numbers and connect directly for tuition requirements."
            features={[
              "Reveal specific student requirement details",
              "Unlock direct parent/student contact numbers",
              "Access verified tuition requests across UAE",
            ]}
            onClose={() => setActiveModalStudent(null)}
          />
        )}
        {activeDetailsStudent && (
          <AdvertisementDetailsModal
            advertisement={activeDetailsStudent}
            type="student"
            onClose={() => setActiveDetailsStudent(null)}
          />
        )}
      </div>
    </section>
  );
};
