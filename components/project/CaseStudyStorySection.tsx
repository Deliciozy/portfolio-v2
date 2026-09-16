import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import type { StorySection } from "@/data/projects";

type CaseStudyStorySectionProps = {
  section: StorySection;
};

export default function CaseStudyStorySection({
  section,
}: CaseStudyStorySectionProps) {
  const hasMedia =
    section.media &&
    section.media.length > 0;

  return (
    <section
      className="case-story"
      data-layout={section.layout}
    >
      <Container>
        <Reveal distance={14}>
          <p className="case-story__section-label">
            {section.sectionLabel}
          </p>
        </Reveal>

        <div className="case-story__grid">
          <Reveal
            className="case-story__text"
            distance={20}
          >
            {section.tags &&
              section.tags.length > 0 && (
                <div className="case-story__tags">
                  {section.tags.map(
                    (tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}

            <h3 className="case-story__title">
              {section.title}
            </h3>

            <div className="case-story__body">
              {section.body.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

            {section.highlight && (
              <blockquote className="case-story__highlight">
                {section.highlight}
              </blockquote>
            )}
          </Reveal>

          {hasMedia && (
            <Reveal
              className="case-story__media"
              delay={0.1}
              distance={24}
            >
              {section.media?.map(
                (media) => (
                  <figure
                    className="case-story__figure"
                    key={media.label}
                  >
                    <div className="case-media-placeholder">
                      {media.label}
                    </div>

                    {media.caption && (
                      <figcaption>
                        {media.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              )}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}