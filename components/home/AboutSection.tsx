"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { api, BACKEND_URL, CmsPageData } from "@/lib/api";

export const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<CmsPageData | null>(null);

  useEffect(() => {
    async function loadAboutData() {
      const data = await api.getCmsPage("about-us");
      if (data) {
        setAboutData(data);
      }
    }
    loadAboutData();
  }, []);

  // Don't render if no data from DB
  if (!aboutData) return null;

  let pillarsList: string[] = [];
  if (aboutData.pillars) {
    if (Array.isArray(aboutData.pillars)) {
      pillarsList = aboutData.pillars;
    } else if (typeof aboutData.pillars === "string") {
      try {
        pillarsList = JSON.parse(aboutData.pillars);
      } catch {
        pillarsList = [];
      }
    }
  }

  // Build image URL from DB path, or null if no image
  const imageUrl = aboutData.image
    ? aboutData.image.startsWith("http")
      ? aboutData.image
      : aboutData.image.startsWith("/")
        ? aboutData.image
        : `${BACKEND_URL}/storage/${aboutData.image}`
    : null;

  return (
    <section id="about" className="relative w-full bg-slate-50/50 border-t border-slate-100 overflow-hidden">
      <div className={`grid grid-cols-1 ${imageUrl ? "lg:grid-cols-12" : ""} min-h-[400px] lg:min-h-[550px] items-stretch`}>

        {/* Left Column: Image — only rendered when an image is available */}
        {imageUrl && (
          <div className="lg:col-span-5 relative w-full h-72 sm:h-96 lg:h-full min-h-[360px] lg:min-h-full">
            <img
              src={imageUrl}
              alt={aboutData.title || "About EduRide"}
              className="w-full h-full object-cover object-center block p-0 m-0"
            />
          </div>
        )}

        {/* Right Column: Content & Details */}
        <div className={`${imageUrl ? "lg:col-span-7" : ""} flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 lg:py-16 max-w-3xl`}>
          {aboutData.badge_text && (
            <ScrollReveal direction="up" distance={20}>
              <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#2563eb] mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
                </span>
                {aboutData.badge_text}
              </div>
            </ScrollReveal>
          )}

          {aboutData.title && (
            <ScrollReveal direction="up" distance={30} delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight mb-4">
                {aboutData.title}
              </h2>
            </ScrollReveal>
          )}

          {aboutData.subtitle && (
            <ScrollReveal direction="up" distance={30} delay={150}>
              <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-relaxed mb-6">
                {aboutData.subtitle}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal direction="up" distance={30} delay={200}>
            <div className="space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
              {/* Pillars list */}
              {pillarsList.length > 0 && (
                <div className="flex flex-wrap gap-2 py-1">
                  {pillarsList.map((pillar, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] text-sm font-semibold"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              )}

              {/* HTML Content from CMS */}
              {aboutData.content && (
                <div
                  className="prose prose-slate max-w-none text-slate-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: aboutData.content }}
                />
              )}

              {/* Action Button */}
              {aboutData.button_text && (
                <div className="pt-2">
                  <a
                    href={aboutData.button_url || "#"}
                    className="inline-flex items-center justify-center rounded-xl bg-[#050505] hover:bg-black px-7 py-3.5 text-[15px] font-bold text-white transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                  >
                    {aboutData.button_text}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};


