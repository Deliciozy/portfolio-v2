import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CapabilityCard from "@/components/ui/CapabilityCard";
import Reveal from "@/components/motion/Reveal";

const capabilities = [
  {
    icon: "⚓",
    title: "Captain",
    subtitle: "Turning separated groups into stronger teams.",
    description:
      "I naturally step up when a team needs direction. My system-oriented mindset allows me to design structures that keep collaboration efficient and push the whole team toward its goals.",
  },
  {
    icon: "◈",
    title: "Guardian",
    subtitle: "Raising the bar through responsibility and detail.",
    description:
      "I'm known for taking full responsibility and holding myself to high standards. I can always notice the small details other people miss, ensuring quality in every delivery.",
  },
  {
    icon: "⌕",
    title: "Explorer",
    subtitle: "Openness as a path to stronger design.",
    description:
      "I embrace every opportunity to learn, treating both praise and critique as fuel for growth. I'm curious about how others think, seeking different perspectives to complement my own.",
  },
];

export default function CapabilitiesSection() {
  return (
    <Section
      size="sm"
      className="capabilities"
    >
      <Container>
        <Reveal
          className="section-heading"
          distance={18}
        >
          <p className="section-kicker">
            // 01 //
          </p>

          <h2 className="section-title">
            Capabilities
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