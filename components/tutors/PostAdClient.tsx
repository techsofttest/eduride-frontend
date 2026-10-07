"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { RequestSuccessModal } from "@/components/tutors/RequestSuccessModal";
import { CategoryData, CountryData, LocationData, EducationLevelData } from "@/lib/api";

const carouselImages = [
  {
    src: "/tutor-banner/tutor3.png",
    alt: "Expert Tutors & Students EduRide",
  },
  {
    src: "/about-home/a1.png",
    alt: "EduRide Learning Platform",
  },
];

type RoleType = "student-parent" | "tutor";

export const PostAdClient: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleType>("student-parent");

  // Database lists
  const [categoriesList, setCategoriesList] = useState<CategoryData[]>([]);
  const [countriesList, setCountriesList] = useState<CountryData[]>([]);
  const [locationsList, setLocationsList] = useState<LocationData[]>([]);
  const [teachingModesList, setTeachingModesList] = useState<{ id: number; name: string }[]>([]);
  const [educationLevelsList, setEducationLevelsList] = useState<EducationLevelData[]>([]);

  // Selected Country filter state
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Form fields
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    subjectOrRequirement: "",
    gradeOrLevel: "",
    experienceOrDays: "",
    preferredMode: "",
    budgetOrRate: "",
    fee_type: "Per Hour",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{ fullName: string; phone: string; role: RoleType }>({
    fullName: "",
    phone: "",
    role: "student-parent",
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    import("@/lib/api").then((m) => {
      m.api.getTeachingModes().then((data) => {
        if (data) setTeachingModesList(data);
      });
      m.api.getCategories().then((data) => {
        if (data) setCategoriesList(data);
      });
      m.api.getCountries().then((data) => {
        if (data) setCountriesList(data);
      });
      m.api.getLocations().then((data) => {
        if (data) setLocationsList(data);
      });
      m.api.getEducationLevels().then((data) => {
        if (data) setEducationLevelsList(data);
      });
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter locations by selected country if selected
  const filteredLocations = useMemo(() => {
    if (!selectedCountry) return locationsList;
    const countryObj = countriesList.find((c) => c.name === selectedCountry);
    if (!countryObj) return locationsList;
    return locationsList.filter(
      (loc) => loc.country_id === countryObj.id || loc.country?.id === countryObj.id
    );
  }, [selectedCountry, locationsList, countriesList]);

  // Selected Location Object
  const selectedLocationObj = useMemo(() => {
    return locationsList.find((loc) => loc.name === formData.city);
  }, [formData.city, locationsList]);

  // Dynamically calculate currency based on selected country/location
  const currentCurrency = useMemo(() => {
    // 1. Direct currency property on location's country relationship
    if (selectedLocationObj?.country?.currency) {
      return selectedLocationObj.country.currency;
    }
    // 2. Lookup country in countriesList by location's country_id
    if (selectedLocationObj?.country_id) {
      const c = countriesList.find((ct) => ct.id === selectedLocationObj.country_id);
      if (c?.currency) return c.currency;
    }
    // 3. Lookup country in countriesList by selectedCountry string
    if (selectedCountry) {
      const c = countriesList.find(
        (ct) => ct.name.toLowerCase() === selectedCountry.toLowerCase()
      );
      if (c?.currency) return c.currency;
      const lower = selectedCountry.toLowerCase();
      if (lower.includes("india")) return "Rs";
      if (lower.includes("emirates") || lower.includes("uae")) return "AED";
      if (lower.includes("saudi")) return "SAR";
      if (lower.includes("qatar")) return "QAR";
    }
    // 4. Fallback check by city name
    if (formData.city) {
      const lowerCity = formData.city.toLowerCase();
      if (
        ["delhi", "mumbai", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "kochi"].some(
          (c) => lowerCity.includes(c)
        )
      ) {
        return "Rs";
      }
    }
    return "AED";
  }, [selectedLocationObj, selectedCountry, countriesList, formData.city]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Parse numeric fee (extract first sequence of digits)
      const feeMatch = formData.budgetOrRate.match(/\d+/);
      const fee_min = feeMatch ? parseInt(feeMatch[0], 10) : null;

      const selectedLocObj = locationsList.find((l) => l.name === formData.city);
      const selectedCatObj = categoriesList.find((c) => c.name === formData.category);

      const payload = {
        title: formData.title,
        type: activeRole === "student-parent" ? "student_requirement" : "tutor",
        description:
          formData.description ||
          (activeRole === "student-parent" ? "No details provided" : "No bio provided"),
        country: selectedCountry || selectedLocObj?.country?.name || null,
        city: formData.city,
        location_id: selectedLocObj?.id || null,
        category_id: selectedCatObj?.id || null,
        teaching_mode: formData.preferredMode,
        education_level: formData.gradeOrLevel,
        contact_name: formData.fullName,
        contact_email: formData.email,
        contact_phone: formData.phone,
        fee_min: fee_min,
        fee_type: `${formData.fee_type} (${currentCurrency})`,
        // Role specific mappings
        ...(activeRole === "student-parent"
          ? {
              requirements: formData.subjectOrRequirement,
              availability: formData.experienceOrDays,
            }
          : {
              qualification: formData.subjectOrRequirement,
              experience: formData.experienceOrDays,
            }),
      };

      await import("@/lib/api").then((m) => m.api.postAdvertisement(payload));
      
      // Save info for success modal
      setSubmittedInfo({ fullName: formData.fullName, phone: formData.phone, role: activeRole });
      setIsSubmitted(true);

      // Clear the form fields
      setFormData({
        title: "",
        fullName: "",
        email: "",
        phone: "",
        city: "",
        category: "",
        subjectOrRequirement: "",
        gradeOrLevel: "",
        experienceOrDays: "",
        preferredMode: "",
        budgetOrRate: "",
        fee_type: "Per Hour",
        description: "",
      });
      setSelectedCountry("");
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Full Background Carousel Bleeding to Left Edge */}
        <div className="lg:col-span-5 lg:sticky lg:top-0 lg:-mt-56 relative min-h-[500px] sm:min-h-[600px] lg:h-screen rounded-none overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-white bg-slate-900 group">
          {/* Background Carousel Images */}
          {carouselImages.map((img, idx) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/30" />
            </div>
          ))}

          {/* Top Breadcrumb Inside Left Column */}
          <div className="relative z-10 lg:pt-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-100">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <svg className="w-3.5 h-3.5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white font-bold">Post an Advertisement</span>
            </nav>
          </div>

          {/* Foreground Header Content aligned to bottom */}
          <div className="relative z-10 space-y-4 pt-12">
            <div className="inline-flex items-center gap-1.5 backdrop-blur-md text-blue-200 text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full bg-slate-900/40 border border-white/10">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {activeRole === "student-parent"
                ? "Student / Parent Requirements"
                : "Verified Tutor Listing"}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {activeRole === "student-parent"
                ? "Post Your Learning Need & Get Connected"
                : "Register as a Tutor & Reach New Students"}
            </h1>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-7 px-4 sm:px-6 lg:px-20 lg:pl-0 flex flex-col justify-center py-6 sm:py-10">
          {/* Toggle Switch for Student/Parent vs Tutor */}
          <div className="mb-6 p-1 bg-slate-100 rounded-lg flex items-center gap-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveRole("student-parent")}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs sm:text-sm font-semibold tracking-wider transition-all cursor-pointer ${
                activeRole === "student-parent"
                  ? "bg-[#2563eb] text-white shadow-sm shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Student / Parent</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("tutor")}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === "tutor"
                  ? "bg-[#2563eb] text-white shadow-sm shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>Tutor Registration</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm sm:text-xl text-slate-900 font-bold leading-relaxed mb-8">
              {activeRole === "student-parent"
                ? "Fill in student requirement details below."
                : "Fill in tutor profile & credentials below."}
            </p>

            {/* Advertisement Title with Character Limit */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {activeRole === "student-parent" ? "Ad Title / Heading *" : "Tutor Profile Title *"}
                </label>
                <span
                  className={`text-xs font-semibold ${
                    formData.title.length >= 40 ? "text-red-500" : "text-slate-400"
                  }`}
                >
                  {formData.title.length} / 40 max chars
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={40}
                placeholder={
                  activeRole === "student-parent"
                    ? "e.g. Need Experienced Physics Tutor for Grade 11 IB"
                    : "e.g. Expert IB & IGCSE Mathematics Specialist"
                }
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Personal Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeRole === "student-parent" ? "e.g. Sarah Ahmed" : "e.g. Dr. John Doe"}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Phone & Country / Location */}
            <div className="space-y-4">
              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Country & Location / City Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      const newCountry = e.target.value;
                      setSelectedCountry(newCountry);
                      setFormData((prev) => ({ ...prev, city: "" }));
                    }}
                    className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    required
                  >
                    <option value="">Select Country...</option>
                    {countriesList.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location / City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location / City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      const loc = locationsList.find((l) => l.name === newCity);
                      if (loc && loc.country) {
                        setSelectedCountry(loc.country.name);
                      } else if (loc && loc.country_id) {
                        const ct = countriesList.find((c) => c.id === loc.country_id);
                        if (ct) setSelectedCountry(ct.name);
                      }
                      setFormData({ ...formData, city: newCity });
                    }}
                    className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    required
                  >
                    <option value="">Select Location / City...</option>
                    {filteredLocations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category & Grade / Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Dropdown from Database */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {activeRole === "student-parent" ? "Subject / Category Needed *" : "Teaching Category / Subject *"}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  required
                >
                  <option value="">Select Category...</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  {categoriesList.length === 0 && (
                    <>
                      <option value="School Tuition (Grades 1-12)">School Tuition (Grades 1-12)</option>
                      <option value="Mathematics & Physics">Mathematics &amp; Physics</option>
                      <option value="Chemistry & Biology">Chemistry &amp; Biology</option>
                      <option value="Medical Education">Medical Education</option>
                      <option value="Special Education / LSA">Special Education / LSA</option>
                    </>
                  )}
                </select>
              </div>

              {/* Grade / Curriculum Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {activeRole === "student-parent" ? "Grade Level / Curriculum *" : "Grade Levels Taught *"}
                </label>
                <select
                  value={formData.gradeOrLevel}
                  onChange={(e) => setFormData({ ...formData, gradeOrLevel: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  required
                >
                  <option value="">Select Grade Level...</option>
                  {educationLevelsList.map((level) => (
                    <option key={level.id} value={level.name}>
                      {level.name}
                    </option>
                  ))}
                  {educationLevelsList.length === 0 && (
                    <>
                      <option value="Primary School">Primary School</option>
                      <option value="Middle School">Middle School</option>
                      <option value="High School">High School</option>
                      <option value="University">University</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Preferred Mode & Experience / Days */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teaching / Tutoring Mode from Database */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Mode *
                </label>
                <select
                  value={formData.preferredMode}
                  onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  required
                >
                  <option value="">Select Teaching Mode...</option>
                  {teachingModesList.map((mode) => (
                    <option key={mode.id} value={mode.name}>
                      {mode.name}
                    </option>
                  ))}
                  {teachingModesList.length === 0 && (
                    <>
                      <option value="Online & Home Tutoring">Online &amp; Home Tutoring</option>
                      <option value="Online Tutoring Only">Online Tutoring Only</option>
                      <option value="Home Tutoring Only">Home Tutoring Only</option>
                    </>
                  )}
                </select>
              </div>

              {/* Experience (Tutor) or Preferred Days (Student) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {activeRole === "student-parent" ? "Preferred Days / Timings *" : "Years of Experience *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeRole === "student-parent" ? "e.g. 3 Days/Week (Weekends)" : "e.g. 8+ Years Experience"}
                  value={formData.experienceOrDays}
                  onChange={(e) => setFormData({ ...formData, experienceOrDays: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Dynamic Currency Rate / Budget Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {activeRole === "student-parent"
                  ? `Budget (${currentCurrency}) *`
                  : `Rate (${currentCurrency}) *`}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={
                    activeRole === "student-parent"
                      ? `e.g. ${currentCurrency} 120`
                      : `e.g. ${currentCurrency} 150`
                  }
                  value={formData.budgetOrRate}
                  onChange={(e) => setFormData({ ...formData, budgetOrRate: e.target.value })}
                  className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <select
                  value={formData.fee_type}
                  onChange={(e) => setFormData({ ...formData, fee_type: e.target.value })}
                  className="border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer whitespace-nowrap min-w-[140px]"
                >
                  <option value="Per Hour">Per Hour</option>
                  <option value="Per Month">Per Month</option>
                </select>
              </div>
            </div>

            {/* Description / Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {activeRole === "student-parent" ? "Requirement Details / Notes" : "Tutor Bio & Teaching Summary"}
              </label>
              <textarea
                rows={2.5}
                placeholder={
                  activeRole === "student-parent"
                    ? "Describe specific topics needed, learning goals, or student requirements."
                    : "Brief summary of your academic degrees, certifications, and teaching accomplishments."
                }
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-slate-300 rounded-sm px-3.5 py-2.5 text-sm font-semibold text-slate-950 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 mb-2 rounded-md bg-red-50 text-red-600 text-sm font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-base font-semibold shadow-lg transition-all ${
                isSubmitting
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/25 cursor-pointer active:scale-[0.98]"
              } mt-2`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : activeRole === "student-parent" ? (
                "Post Student Requirement"
              ) : (
                "Submit Tutor Listing for Review"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isSubmitted && (
        <RequestSuccessModal
          fullName={submittedInfo.fullName}
          phone={submittedInfo.phone}
          role={submittedInfo.role}
          onClose={() => setIsSubmitted(false)}
        />
      )}
    </div>
  );
};
