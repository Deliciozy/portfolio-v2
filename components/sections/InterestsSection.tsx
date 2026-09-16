import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import { interests } from "@/data/about";

export default function InterestsSection() {
  return (
    <Section
      size="sm"
      className="interests"
    >
      <Container>
        <Reveal
          className="section-heading"
          distance={18}
        >
          <p className="section-kicker">
            // 06 //
          </p>

          <h2 className="section-title">
            Interests
          </h2>
        </Reveal>

        <StaggerGroup
          className="interests__grid"
          stagger={0.1}
        >
          {interests.map((interest) => (
            <StaggerItem
              key={interest.title}
              distance={20}
            >
              <article className="interest-card">
                <div className="interest-card__media">
                  {interest.imageLabel}
                </div>

                <div className="interest-card__content">
                  <h3 className="interest-card__title">
                    {interest.title}
                  </h3>

                  <p className="interest-card__description">
                    {interest.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}