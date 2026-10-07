"use client";

import React, { useState, useEffect } from "react";
import { StudentCard, StudentRequirement } from "@/components/students/StudentCard";
import { TutorFilterBar } from "@/components/tutors/TutorFilterBar";
import { PurchaseCard } from "@/components/tutors/PurchaseCard";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, AdvertisementData, CategoryData, LocationData } from "@/lib/api";

export const StudentDirectoryClient: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalStudent, setActiveModalStudent] = useState<any>(null);

  const [students, setStudents] = useState<AdvertisementData[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
  const [locationsList, setLocationsList] = useState<LocationData[]>([]);
  const [countriesList, setCountriesList] = useState<{id: number, name: string}[]>([]);
  const [teachingModesList, setTeachingModesList] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [adsRes, catsRes, locsRes, modesRes, countriesRes] = await Promise.all([
          api.getAdvertisements({ type: "student_requirement" }),
          api.getCategories(),
          api.getLocations(),
          api.getTeachingModes(),
          api.getCountries(),
        ]);

        if (adsRes && adsRes.data) {
          setStudents(adsRes.data);
        }
        if (catsRes) {
          setCategoriesList(catsRes);
        }
        if (locsRes) {
          setLocationsList(locsRes);
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

  const filteredLocationsList = selectedCountry === "All" 
    ? locationsList 
    : locationsList.filter((l) => {
        const country = countriesList.find((c) => c.name === selectedCountry);
        return country && l.country_id === country.id;
      });

  const locations = ["All", ...filteredLocationsList.map((l) => l.name)];
  const modes = ["All", ...teachingModesList.map((m) => m.name)];


  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedLocation !== "All" ||
    selectedCountry !== "All" ||
    selectedMode !== "All";

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSelectedLocation("All");
    setSelectedMode("All");
  };

  const filteredStudents = students.filter((student) => {
    const studentCategory = student.category?.name || "General";
    const studentLocation = student.location?.name || student.city || "Online";
    const studentMode = student.teaching_mode || "";
    const selectedCountryData = countriesList.find(c => c.name === selectedCountry);

    if (selectedCountry !== "All" && (!selectedCountryData || student.location?.country_id !== selectedCountryData.id)) {
      return false;
    }
    if (selectedCategory !== "All" && studentCategory !== selectedCategory) {
      return false;
    }
    if (selectedLocation !== "All" && !studentLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    if (selectedMode !== "All" && !studentMode.toLowerCase().includes(selectedMode.replace(" tuition", "").replace(" Tuition", "").toLowerCase())) {
      return false;
    }
    if (
      searchQuery &&
      !student.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !studentLocation.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="pb-10 bg-slate-50/50">
      {/* Full Width Sticky Filter Bar */}
      <TutorFilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        hasActiveFilters={hasActiveFilters}
        handleResetFilters={handleResetFilters}
        categories={categories}
        countries={countries}
        locations={locations}
        modes={modes}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Available Student Requirements ({filteredStudents.length})
          </h2>
        </div>

        {/* 3-Column Grid of Student Cards */}
        {!loading && filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10 items-stretch">
            {filteredStudents.map((student, idx) => {
              const mappedStudent = {
                id: student.id,
                title: student.title,
                grade: student.education_level || "Any level",
                location: student.location?.name || student.city || "Online",
                preferredMode: student.teaching_mode || "Flexible",
                preferredDays: student.preferred_days ? student.preferred_days.join(", ") : "Any day",
                budget: student.fee_min ? `AED ${student.fee_min}${student.fee_type ? '/' + student.fee_type.replace('per ', '') : ''}` : "Negotiable",
                category: student.category?.name || "General",
                contactName: student.contact_name || student.user?.name || "Student / Parent",
                contactPhone: student.contact_phone || "+971 50 987 6543",
                contactEmail: student.contact_email || student.user?.email || "parent@eduride.ae",
                rawAd: student,
              };

              return (
                <ScrollReveal key={student.id} direction="up" delay={50 + idx * 40}>
                  <StudentCard
                    student={mappedStudent as any}
                    onUnlockContact={() => setActiveModalStudent(mappedStudent)}
                  />
                </ScrollReveal>
              );
            })}
          </div>
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
      </div>
    </section>
  );
};
