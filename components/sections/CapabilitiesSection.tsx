import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import CapabilityCard from "@/components/ui/CapabilityCard";
import SectionHeading from "@/components/ui/SectionHeading";

const capabilities = [
  {
    icon: "captain" as const,

    title: "Captain",

    subtitle:
      "Turning separated groups into stronger teams.",

    description:
      "I naturally step up when a team needs direction. My system-oriented mindset allows me to design structures that keep collaboration efficient and push the whole team toward its goals.",
  },

  {
    icon: "guardian" as const,

    title: "Guardian",

    subtitle:
      "Raising the bar through responsibility and detail.",

    description:
      "I’m known for taking full responsibility and holding myself to high standards. I can always notice the small details other people miss, ensuring quality in every delivery.",
  },

  {
    icon: "explorer" as const,

    title: "Explorer",

    subtitle:
      "Openness as a path to stronger design.",

    description:
      "I embrace every opportunity to learn, treating both praise and critique as fuel for growth. I’m curious about how others think, seeking different perspectives to complement my own.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="home-capabilities">
      <div className="home-section-container">
        <SectionHeading
          index="01"
          title="Capabilities"
        />

        <StaggerGroup
          className="home-capabilities__grid"
          stagger={0.07}
        >
          {capabilities.map(
            (capability) => (
              <StaggerItem
                key={capability.title}
                distance={60}
                className="home-capability-wrap"
              >
                <CapabilityCard
                  {...capability}
                />
              </StaggerItem>
            )
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}