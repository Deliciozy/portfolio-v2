import Container from "@/components/layout/Container";
import type { ProjectRoleItem } from "@/data/projects";

type CaseStudyRoleGridProps = {
  items: ProjectRoleItem[];
};

export default function CaseStudyRoleGrid({
  items,
}: CaseStudyRoleGridProps) {
  return (
    <section className="case-role">
      <Container>
        <h2 className="case-section-title">
          My Teams & My Role
        </h2>

        <div className="case-role__grid">
          {items.map((item) => (
            <div
              className="case-role__item"
              key={item.label}
            >
              <p className="case-role__label">
                {item.label}
              </p>

              <p className="case-role__value">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}