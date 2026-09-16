import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import { aboutHero } from "@/data/about";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <Container>
        <div className="about-hero__grid">
          <Reveal
            className="about-hero__content"
            distance={20}
          >
            <h1 className="about-hero__title">
              {aboutHero.title}
            </h1>

            <p className="about-hero__subtitle">
              {aboutHero.subtitle}
            </p>

            <div className="about-hero__body">
              {aboutHero.body.map(
                (paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </Reveal>

          <Reveal
            className="about-hero__media"
            delay={0.12}
            distance={24}
          >
            <div className="about-hero__image-placeholder">
              {aboutHero.imageLabel}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}