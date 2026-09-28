import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import CapabilityCard from "@/components/ui/CapabilityCard";

import SectionHeading from "@/components/ui/SectionHeading";

import {
  aboutCapabilities,
} from "@/data/about";

export default function AboutCapabilitiesSection() {
  return (
    <section className="about-shapes">
      <div className="about-section-container">
        <SectionHeading
          index="01"
          title="What Shapes Me"
        />

        <StaggerGroup
          className="about-shapes__grid"
          stagger={0.07}
        >
          {aboutCapabilities.map(
            (capability) => (
              <StaggerItem
                key={
                  capability.title
                }
                distance={60}
                className="about-shared-capability-wrap"
              >
                <CapabilityCard
                  title={
                    capability.title
                  }
                  subtitle={
                    capability.subtitle
                  }
                  description={
                    capability.description
                  }
                  icon={
                    capability.icon
                  }
                />
              </StaggerItem>
            ),
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}