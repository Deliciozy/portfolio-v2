import "./home.css";

import Navbar from "@/components/ui/Navbar";

import Hero from "@/components/sections/Hero";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

export default function Home() {
  return (
    <main className="home-page">
      <Navbar />

      <Hero />

      <CapabilitiesSection />

      <ProjectsSection />

      <ReviewsSection />
    </main>
  );
}