"use client";

import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current
    const range: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPageNumbers();

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6 ${className}`}
    >
      {/* Mobile Page Indicator */}
      <div className="sm:hidden text-xs font-semibold text-slate-500">
        Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </div>

      {/* Prev button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-400 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-950 active:scale-95 shadow-xs"
        aria-label="Go to previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>

      {/* Numbered Buttons (Hidden or Compact on small mobile) */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-bold select-none"
              >
                ...
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? "page" : undefined}
              className={`min-w-8 sm:min-w-9 h-8 sm:h-9 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#2563eb] text-white shadow-sm shadow-[#2563eb]/25"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-400 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-950 active:scale-95 shadow-xs"
        aria-label="Go to next page"
      >
        <span>Next</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};
