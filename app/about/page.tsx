import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FounderSection } from "@/components/home/FounderSection";
import { TrustStatsSection } from "@/components/home/TrustStatsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans selection:bg-[#2563eb] selection:text-white">
      <Header />
      <AboutHeroSection />
      <div id="about-details">
        <AboutSection />
      </div>
      <FounderSection />
      <TrustStatsSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}

