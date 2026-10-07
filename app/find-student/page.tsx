import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { DirectoryHero } from "@/components/global/DirectoryHero";
import { StudentDirectoryClient } from "@/components/students/StudentDirectoryClient";
import { PostAdCtaSection } from "@/components/home/PostAdCtaSection";

export const metadata = {
  title: "Student Requirements & Tuition Requests | EduRide",
  description: "Browse student tuition requirements across UAE including Dubai, Sharjah, and Abu Dhabi.",
};

export default function FindStudentPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#2563eb] selection:text-white">
      <Header />
      <DirectoryHero
        breadcrumbLabel="Find Students"
        title="Find Student Requirements"
        ctaLabel="Post Ad to Get Students"
        ctaHref="/post-ad"
      />
      <StudentDirectoryClient />
      <PostAdCtaSection />
      <Footer />
    </main>
  );
}

