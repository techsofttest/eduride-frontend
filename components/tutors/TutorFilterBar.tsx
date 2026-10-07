"use client";

import React from "react";

export interface TutorFilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  selectedMode: string;
  setSelectedMode: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  hasActiveFilters: boolean;
  handleResetFilters: () => void;
  categories: string[];
  countries: string[];
  locations: string[];
  modes: string[];
}

export const TutorFilterBar: React.FC<TutorFilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedMode,
  setSelectedMode,
  selectedCountry,
  setSelectedCountry,
  hasActiveFilters,
  handleResetFilters,
  categories,
  countries,
  locations,
  modes,
}) => {
  return (
    <div className="sticky top-24 z-30 w-full bg-white backdrop-blur-md shadow-xs py-3.5 sm:py-4 px-4 sm:px-6 lg:px-18 mb-10 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Floating Label Dropdown Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 max-w-4xl">
          {/* Category Dropdown Box */}
          <div className="relative bg-white border border-slate-300 rounded-sm px-3.5 py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
            <span className="block text-[14px] font-medium text-slate-500">
              Category
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent text-slate-950 font-semibold text-sm sm:text-xl outline-none cursor-pointer appearance-none pr-6 pt-1"
            >
              <option value="All">All Categories</option>
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <div className="absolute right-3.5 bottom-2.5 pointer-events-none text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Country Dropdown Box */}
          <div className="relative bg-white border border-slate-300 rounded-sm px-3.5 py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
            <span className="block text-[14px] font-medium text-slate-500">
              Country
            </span>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedLocation("All"); // Reset city when country changes
              }}
              className="w-full bg-transparent text-slate-950 font-semibold text-sm sm:text-xl outline-none cursor-pointer appearance-none pr-6 pt-1"
            >
              <option value="All">All Countries</option>
              {countries
                .filter((c) => c !== "All")
                .map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
            </select>
            <div className="absolute right-3.5 bottom-2.5 pointer-events-none text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* City Location Dropdown Box */}
          <div className="relative bg-white border border-slate-300 rounded-sm px-3.5 py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
            <span className="block text-[14px] font-medium text-slate-500">
              City Location
            </span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-transparent text-slate-950 font-semibold text-sm sm:text-xl outline-none cursor-pointer appearance-none pr-6 pt-1"
            >
              <option value="All">All Cities</option>
              {locations
                .filter((l) => l !== "All")
                .map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
            </select>
            <div className="absolute right-3.5 bottom-2.5 pointer-events-none text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Teaching Mode Dropdown Box */}
          <div className="relative bg-white border border-slate-300 rounded-sm px-3.5 py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
            <span className="block text-[14px] font-medium text-slate-500">
              Teaching Mode
            </span>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full bg-transparent text-slate-950 font-semibold text-sm sm:text-xl outline-none cursor-pointer appearance-none pr-6 pt-1"
            >
              <option value="All">All Modes</option>
              {modes
                .filter((m) => m !== "All")
                .map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
            <div className="absolute right-3.5 bottom-2.5 pointer-events-none text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Reset Button (Always visible) */}
        <button
          onClick={handleResetFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-sm text-md font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer shrink-0 mt-4 lg:mt-3"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
};
