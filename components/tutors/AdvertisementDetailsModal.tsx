"use client";

import React from "react";
import { AdvertisementData } from "@/lib/api";

interface AdvertisementDetailsModalProps {
  advertisement: AdvertisementData;
  onClose: () => void;
  type: "tutor" | "student";
}

export const AdvertisementDetailsModal: React.FC<AdvertisementDetailsModalProps> = ({
  advertisement,
  onClose,
  type,
}) => {
  const educationLevel = Array.isArray(advertisement.education_level)
    ? advertisement.education_level.join(", ")
    : advertisement.education_level;
  const preferredDays = advertisement.preferred_days?.join(", ");
  const fee = [advertisement.fee_min, advertisement.fee_max]
    .filter((value): value is number => value !== null && value !== undefined)
    .map((value) => `AED ${value}`)
    .join(" - ");
  const feeDetails = [fee, advertisement.fee_type]
    .filter(Boolean)
    .join(" / ");
  const location = [
    advertisement.location?.name,
    advertisement.area,
    advertisement.city,
    advertisement.state,
    advertisement.location?.country?.name ?? advertisement.country,
  ]
    .filter(Boolean)
    .join(", ");

  const details = [
    { label: "Category", value: advertisement.category?.name },
    { label: "Subject", value: advertisement.subject_name || advertisement.subject?.name },
    { label: "Grade / Education Level", value: educationLevel },
    ...(type === "tutor"
      ? [
          { label: "Qualification", value: advertisement.qualification },
          { label: "Experience", value: advertisement.experience },
        ]
      : []),
    { label: "Location", value: location },
    { label: "Address", value: advertisement.address },
    { label: type === "tutor" ? "Teaching Mode" : "Preferred Tuition Mode", value: advertisement.teaching_mode },
    { label: "Availability", value: advertisement.availability },
    { label: "Preferred Days", value: preferredDays },
    { label: type === "tutor" ? "Fee" : "Budget", value: feeDetails },
    { label: "Requirements", value: advertisement.requirements },
  ].filter((detail) => Boolean(detail.value));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="advertisement-details-title"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close ad details"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-10">
          {advertisement.type === "community" && type === "tutor" && (
            <span className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              Eduride Community Tutor
            </span>
          )}
          <h2 id="advertisement-details-title" className="text-2xl font-black text-slate-950">
            {advertisement.title}
          </h2>
        </div>

        {advertisement.description && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Description</h3>
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
              {advertisement.description}
            </p>
          </div>
        )}

        {details.length > 0 && (
          <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
            {details.map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words text-sm font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </div>
  );
};
