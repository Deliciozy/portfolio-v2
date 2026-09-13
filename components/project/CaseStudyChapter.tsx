import Container from "@/components/layout/Container";
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
        <h2 className="case-chapter__title">
          {chapter.title}
        </h2>
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