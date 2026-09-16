import Link from "next/link";

import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import CaseStudyHero from "@/components/project/CaseStudyHero";
import CaseStudyRoleGrid from "@/components/project/CaseStudyRoleGrid";
import CaseStudyChapter from "@/components/project/CaseStudyChapter";
import CaseStudyMetricGrid from "@/components/project/CaseStudyMetricGrid";

import type { Project } from "@/data/projects";

type ProjectCaseStudyProps = {
  project: Project;
  nextProject: Project;
};

export default function ProjectCaseStudy({
  project,
  nextProject,
}: ProjectCaseStudyProps) {
  const { caseStudy } = project;

  return (
    <main className="case-study">
      <header className="case-nav">
        <Container>
          <nav className="case-nav__inner">
            <Link
              href="/"
              className="case-nav__name"
            >
              Mary Chen
            </Link>

            <div className="case-nav__links">
              <Link href="/#work">
                Works
              </Link>

              <Link href="/about">
                About me
              </Link>

              <Link href="/resume.pdf">
                Resume
              </Link>
            </div>
          </nav>
        </Container>
      </header>

      <CaseStudyHero
        project={project}
      />

      <section className="case-feature">
        <Container>
          <Reveal
            className="case-feature__heading"
            distance={18}
          >
            <p className="case-label">
              {caseStudy.mainFeature.label}
            </p>

            <h2 className="case-section-title">
              {caseStudy.mainFeature.title}
            </h2>

            <p className="case-feature__description">
              {caseStudy.mainFeature.description}
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            distance={24}
          >
            <figure className="case-feature__media">
              <div className="case-media-placeholder">
                {caseStudy.mainFeature.media.label}
              </div>

              {caseStudy.mainFeature.media.caption && (
                <figcaption className="case-caption">
                  {
                    caseStudy.mainFeature
                      .media.caption
                  }
                </figcaption>
              )}
            </figure>
          </Reveal>
        </Container>
      </section>

      <section className="case-moment">
        <Container>
          <Reveal distance={18}>
            <h2 className="case-section-title">
              {
                caseStudy.memorableMoment
                  .title
              }
            </h2>
          </Reveal>

          <Reveal
            className="case-moment__content"
            delay={0.06}
            distance={20}
          >
            {caseStudy.memorableMoment.highlight && (
              <p className="case-moment__highlight">
                {
                  caseStudy.memorableMoment
                    .highlight
                }
              </p>
            )}

            <div className="case-moment__body">
              {caseStudy.memorableMoment.body.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <CaseStudyRoleGrid
        items={caseStudy.roleItems}
      />

      <div className="case-study__chapters">
        {caseStudy.chapters.map(
          (chapter, index) => (
            <CaseStudyChapter
              key={`${chapter.title}-${index}`}
              chapter={chapter}
            />
          )
        )}
      </div>

      <CaseStudyMetricGrid
        title={caseStudy.impact.title}
        body={caseStudy.impact.body}
        metrics={caseStudy.impact.metrics}
      />

      <section className="case-next">
        <Container>
          <Reveal distance={18}>
            <p className="case-label">
              // Next Project //
            </p>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="case-next__link"
            >
              <span>
                {nextProject.title}
              </span>

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}