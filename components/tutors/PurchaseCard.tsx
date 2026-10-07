"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface PurchaseCardProps {
  item?: any;
  onClose: () => void;
  title?: string;
  description?: string;
  features?: string[];
  type?: "tutor" | "student";
}

export const PurchaseCard: React.FC<PurchaseCardProps> = ({
  item,
  onClose,
  title = "Unlock Direct Contacts",
  description = "Get instant access to verified contact numbers and connect immediately.",
  features = [
    "Reveal specific advertisement details",
    "Unlock direct phone & WhatsApp contacts",
    "Instant connection with verified listings",
  ],
  type = "tutor",
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Extract contact details dynamically
  const name =
    item?.contactName ||
    item?.name ||
    item?.rawAd?.contact_name ||
    item?.rawAd?.user?.name ||
    (type === "student" ? "Student / Parent" : "Verified Tutor");

  const phone =
    item?.contactPhone ||
    item?.rawAd?.contact_phone ||
    "+971 50 123 4567";

  const email =
    item?.contactEmail ||
    item?.rawAd?.contact_email ||
    item?.rawAd?.user?.email ||
    "contact@eduride.ae";

  const location =
    item?.location ||
    item?.rawAd?.location?.name ||
    item?.rawAd?.city ||
    "UAE";

  const cleanWhatsAppPhone = phone.replace(/[^0-9]/g, "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isUnlocked ? (
          <>
            {/* Lock Icon */}
            <div className="mx-auto mb-5 text-[#2563eb] flex items-center justify-center">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#2563eb] animate-bounce duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug mb-2">
              {title}
            </h3>

            {/* Description & Features */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {description}
            </p>

            <div className="text-left space-y-2 py-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Unlock for Free Button */}
              <button
                onClick={() => setIsUnlocked(true)}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>Unlock for Free</span>
              </button>

              {/* Purchase Premium Button */}
              <Link
                href="/premium-access"
                className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3.5 text-sm sm:text-base tracking-wider font-semibold shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Purchase Premium &bull; AED 49</span>
              </Link>

              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 text-sm font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          /* Unlocked Contact Details View */
          <div className="text-left animate-in fade-in zoom-in duration-300">
            {/* Success Header */}
            <div className="flex items-center gap-3 mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-emerald-950">Contact Unlocked!</h4>
                <p className="text-xs font-semibold text-emerald-700">Verified direct details ready to connect.</p>
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5 mb-6">
              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  {type === "student" ? "Student / Parent Name" : "Tutor Name"}
                </span>
                <span className="text-base font-bold text-slate-900">{name}</span>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Phone / WhatsApp
                </span>
                <a href={`tel:${phone}`} className="text-lg font-black text-[#2563eb] hover:underline flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phone}</span>
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Email Address
                </span>
                <a href={`mailto:${email}`} className="text-sm font-bold text-slate-800 hover:underline flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{email}</span>
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Location
                </span>
                <span className="text-sm font-semibold text-slate-700">{location}</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-3 text-sm font-bold shadow-md transition-all active:scale-[0.98]"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>

              <a
                href={`https://wa.me/${cleanWhatsAppPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-sm font-bold shadow-md transition-all active:scale-[0.98]"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 text-sm font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
