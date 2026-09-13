import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero__grid">
          <Reveal
            className="hero__content"
            distance={20}
          >
            <p className="hero__eyebrow">
              // Hi, I&apos;m Mary //
            </p>

            <h1 className="hero__title">
              Strength In Leading,
              <br />
              Trust In Details,
              <br />
              Openness In Growth.
            </h1>

            <div className="hero__worked">
              <p>Worked on</p>

              <div className="hero__brands">
                <span>Microsoft AI</span>
                <span>Automin.ai</span>
                <span>UW MSTI</span>
              </div>
            </div>
          </Reveal>

          <Reveal
            className="hero__media"
            delay={0.12}
            distance={24}
          >
            <div className="hero__placeholder">
              Hero Image
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}