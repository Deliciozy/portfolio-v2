import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import AboutHero from "@/components/sections/AboutHero";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import InterestsSection from "@/components/sections/InterestsSection";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <AboutHero />

      <CapabilitiesSection
        title="What Shapes Me"
        kicker="// 01 //"
        className="about-capabilities"
      />

      <InterestsSection />

      <Footer />
    </main>
  );
}