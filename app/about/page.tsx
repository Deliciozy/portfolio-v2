import Navbar from "@/components/ui/Navbar";

import AboutHero from "@/components/sections/AboutHero";

import AboutCapabilitiesSection from "@/components/sections/AboutCapabilitiesSection";

import InterestsSection from "@/components/sections/InterestsSection";

export default function AboutPage() {
  return (
    <main className="about-page">
      <Navbar />

      <AboutHero />

      <AboutCapabilitiesSection />

      <InterestsSection />
    </main>
  );
}