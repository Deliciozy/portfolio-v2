import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CapabilitiesSection />
      <ProjectsSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}