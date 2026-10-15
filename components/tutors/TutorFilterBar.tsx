"use client";

import React, { useState } from "react";

export interface TutorFilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedMode: string;
  setSelectedMode: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  hasActiveFilters: boolean;
  handleResetFilters: () => void;
  categories: string[];
  countries: string[];
  modes: string[];
}

export const TutorFilterBar: React.FC<TutorFilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedMode,
  setSelectedMode,
  selectedCountry,
  setSelectedCountry,
  hasActiveFilters,
  handleResetFilters,
  categories,
  countries,
  modes,
}) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Calculate number of active filters
  const activeCount = [
    selectedCategory !== "All" ? 1 : 0,
    selectedCountry !== "All" ? 1 : 0,
    selectedMode !== "All" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="sticky top-[120px] md:top-24 z-30 w-full bg-white/95 backdrop-blur-md shadow-xs py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-18 mb-6 sm:mb-10 transition-all border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Compact Header Bar (< lg) */}
        <div className="flex lg:hidden items-center justify-between gap-2 py-1">
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            aria-expanded={isMobileExpanded}
          >
            <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2563eb] text-white text-[11px] font-black">
                {activeCount}
              </span>
            )}
            <svg
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                isMobileExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Quick Active Filters Summary or Reset Button on Mobile */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Mobile Active Filter Quick Tags (Visible when collapsed and filters are active) */}
        {!isMobileExpanded && hasActiveFilters && (
          <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 pb-0.5">
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] text-[11px] font-semibold shrink-0 border border-blue-100">
                <span>{selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedCountry !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] text-[11px] font-semibold shrink-0 border border-blue-100">
                <span>{selectedCountry}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCountry("All")}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedMode !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] text-[11px] font-semibold shrink-0 border border-blue-100">
                <span>{selectedMode}</span>
                <button
                  type="button"
                  onClick={() => setSelectedMode("All")}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* Main Filter Controls (Always visible on desktop lg:flex; toggleable on mobile) */}
        <div
          className={`${
            isMobileExpanded ? "flex flex-col mt-3 pt-3 border-t border-slate-100" : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:mt-0 lg:pt-0 lg:border-none`}
        >
          {/* Floating Label Dropdown Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 flex-1 max-w-4xl">
            {/* Category Dropdown Box */}
            <div className="relative bg-white border border-slate-300 rounded-sm px-3 py-1.5 sm:py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
              <span className="block text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Category
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-slate-950 font-bold text-xs sm:text-sm outline-none cursor-pointer appearance-none pr-6 pt-0.5"
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
              <div className="absolute right-3 bottom-1.5 pointer-events-none text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Country Dropdown Box */}
            <div className="relative bg-white border border-slate-300 rounded-sm px-3 py-1.5 sm:py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
              <span className="block text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Country
              </span>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
                className="w-full bg-transparent text-slate-950 font-bold text-xs sm:text-sm outline-none cursor-pointer appearance-none pr-6 pt-0.5"
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
              <div className="absolute right-3 bottom-1.5 pointer-events-none text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Teaching Mode Dropdown Box */}
            <div className="relative bg-white border border-slate-300 rounded-sm px-3 py-1.5 sm:py-2 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
              <span className="block text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Teaching Mode
              </span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full bg-transparent text-slate-950 font-bold text-xs sm:text-sm outline-none cursor-pointer appearance-none pr-6 pt-0.5"
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
              <div className="absolute right-3 bottom-1.5 pointer-events-none text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons in expanded state / desktop */}
          <div className="flex items-center gap-2 mt-3 lg:mt-0">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Reset</span>
            </button>

            {/* Mobile Done/Close button */}
            <button
              type="button"
              onClick={() => setIsMobileExpanded(false)}
              className="lg:hidden inline-flex items-center justify-center px-4 py-2 rounded-sm text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-all cursor-pointer w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
