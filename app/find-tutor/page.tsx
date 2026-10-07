import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { DirectoryHero } from "@/components/global/DirectoryHero";
import { TutorDirectoryClient } from "@/components/tutors/TutorDirectoryClient";
import { PostAdCtaSection } from "@/components/home/PostAdCtaSection";

export default function FindTutorPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#2563eb] selection:text-white">
      <Header />
      <DirectoryHero
        breadcrumbLabel="Find a Tutor"
        title="Find Qualified Tutors"
        ctaLabel="Post Ad to Find a Tutor"
        ctaHref="/post-ad"
      />
      <TutorDirectoryClient />
      <PostAdCtaSection />
      <Footer />
    </main>
  );
}

