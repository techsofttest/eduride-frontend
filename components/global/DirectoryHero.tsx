"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export interface DirectoryHeroProps {
  breadcrumbLabel: string;
  title: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const DirectoryHero: React.FC<DirectoryHeroProps> = ({
  breadcrumbLabel,
  title,
  ctaLabel = "Post a Requirement / Ad",
  ctaHref = "/post-ad",
}) => {
  return (
    <section className="bg-white text-slate-950 pt-8 pb-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={10}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-3">
                <Link href="/" className="hover:text-[#2563eb] transition-colors">
                  Home
                </Link>
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-slate-900 font-bold">{breadcrumbLabel}</span>
              </nav>

              {/* Header Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight">
                {title}
              </h1>
            </div>

            {/* Right Action CTA Button (Secondary Style) */}
            <div className="flex items-center shrink-0">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl hover:bg-blue-50 text-[#2563eb] border border-blue-200/80 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>{ctaLabel}</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
