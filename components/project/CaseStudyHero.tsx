import Container from "@/components/layout/Container";
import type { Project } from "@/data/projects";

type CaseStudyHeroProps = {
  project: Project;
};

export default function CaseStudyHero({
  project,
}: CaseStudyHeroProps) {
  return (
    <section className="case-hero">
      <Container>
        <div className="case-hero__grid">
          <div className="case-hero__content">
            <div className="case-hero__meta">
              <span className="case-hero__year">
                {project.year}
              </span>

              <span>
                {project.category}
              </span>
            </div>

            <h1 className="case-hero__title">
              {project.title}
            </h1>

            <p className="case-hero__intro">
              {project.caseStudy.intro}
            </p>
          </div>

          <div className="case-hero__media">
            <div className="case-media-placeholder">
              {
                project.caseStudy
                  .heroMedia.label
              }
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}