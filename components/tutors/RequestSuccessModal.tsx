"use client";

import React from "react";
import Link from "next/link";

export interface RequestSuccessModalProps {
  fullName: string;
  phone: string;
  role?: "student-parent" | "tutor";
  onClose: () => void;
}

export const RequestSuccessModal: React.FC<RequestSuccessModalProps> = ({
  fullName,
  phone,
  role = "tutor",
  onClose,
}) => {
  const isStudent = role === "student-parent";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Big Animated Success Check Icon */}
        <div className="mx-auto mb-5 text-emerald-600 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce duration-1000">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug mb-2">
          {isStudent ? `Requirement Submitted, ${fullName}!` : `Profile Submitted, ${fullName}!`}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
          {isStudent ? (
            <>
              Your student requirement ad has been submitted for review. Once verified by our{" "}
              <strong className="text-slate-900">EduRide Admin team</strong>, it will be published in the Student Requirements directory.
            </>
          ) : (
            <>
              Your tutor profile ad has been submitted for review. Once verified by our{" "}
              <strong className="text-slate-900">EduRide Admin team</strong>, it will be published in the Find Tutors directory.
            </>
          )}
        </p>

        {/* Modal Buttons */}
        <div className="space-y-3">
          <Link
            href={isStudent ? "/find-student" : "/find-tutor"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3.5 text-sm font-bold shadow-md transition-all active:scale-[0.98]"
          >
            {isStudent ? "View Student Requirements" : "View Tutor Directory"}
          </Link>

          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 text-sm font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
