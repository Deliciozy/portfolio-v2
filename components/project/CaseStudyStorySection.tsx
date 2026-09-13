import Container from "@/components/layout/Container";
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
        <p className="case-story__section-label">
          {section.sectionLabel}
        </p>

        <div className="case-story__grid">
          <div className="case-story__text">
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
          </div>

          {hasMedia && (
            <div className="case-story__media">
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
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}