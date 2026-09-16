import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import CaseStudyStorySection from "@/components/project/CaseStudyStorySection";

import type { ProjectChapter } from "@/data/projects";

type CaseStudyChapterProps = {
  chapter: ProjectChapter;
};

export default function CaseStudyChapter({
  chapter,
}: CaseStudyChapterProps) {
  return (
    <section className="case-chapter">
      <Container>
        <Reveal distance={18}>
          <h2 className="case-chapter__title">
            {chapter.title}
          </h2>
        </Reveal>
      </Container>

      <div className="case-chapter__sections">
        {chapter.sections.map(
          (section, index) => (
            <CaseStudyStorySection
              key={`${section.title}-${index}`}
              section={section}
            />
          )
        )}
      </div>
    </section>
  );
}