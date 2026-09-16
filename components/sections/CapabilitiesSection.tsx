import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CapabilityCard from "@/components/ui/CapabilityCard";
import Reveal from "@/components/motion/Reveal";

type CapabilitiesSectionProps = {
  title?: string;
  kicker?: string;
  className?: string;
};

const capabilities = [
  {
    icon: "⚓",
    title: "Captain",
    subtitle:
      "Turning separated groups into stronger teams.",
    description:
      "I naturally step up when a team needs direction. Taking ownership beyond my role, I align peers, interns, and collaborators around clear goals and keep progress moving forward.",
  },
  {
    icon: "◈",
    title: "Guardian",
    subtitle:
      "Raising the bar through responsibility and detail.",
    description:
      "I'm known for taking full responsibility and holding myself to high standards. I catch the small details others miss, ensuring quality in every delivery.",
  },
  {
    icon: "⌕",
    title: "Explorer",
    subtitle:
      "Openness as a path to stronger design.",
    description:
      "I embrace every opportunity to learn, treating both praise and critique as fuel for growth. Curiosity drives me to understand how others think and seek perspectives beyond my own.",
  },
];

export default function CapabilitiesSection({
  title = "Capabilities",
  kicker = "// 01 //",
  className = "",
}: CapabilitiesSectionProps) {
  return (
    <Section
      size="sm"
      className={`capabilities ${className}`}
    >
      <Container>
        <Reveal
          className="section-heading"
          distance={18}
        >
          <p className="section-kicker">
            {kicker}
          </p>

          <h2 className="section-title">
            {title}
          </h2>
        </Reveal>

        <Reveal
          className="capabilities__grid"
          delay={0.08}
          distance={22}
        >
          {capabilities.map(
            (capability) => (
              <CapabilityCard
                key={capability.title}
                {...capability}
              />
            )
          )}
        </Reveal>
      </Container>
    </Section>
  );
}