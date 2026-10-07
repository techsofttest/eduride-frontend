import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStatsSection } from "@/components/home/TrustStatsSection";
import { TutorListingSection } from "@/components/home/TutorListingSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FounderSection } from "@/components/home/FounderSection";
import { PostAdCtaSection } from "@/components/home/PostAdCtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans selection:bg-[#2563eb] selection:text-white">
      <Header />
      <HeroSection />
      <TrustStatsSection />
      <AboutSection />
      <TutorListingSection />
      <PostAdCtaSection />
      <HowItWorksSection />
      <FounderSection />
      <Footer />
    </main>
  );
}