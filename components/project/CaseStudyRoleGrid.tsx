import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

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
        <Reveal distance={18}>
          <h2 className="case-section-title">
            My Teams & My Role
          </h2>
        </Reveal>

        <StaggerGroup
          className="case-role__grid"
          stagger={0.08}
        >
          {items.map((item) => (
            <StaggerItem
              key={item.label}
              distance={16}
            >
              <div className="case-role__item">
                <p className="case-role__label">
                  {item.label}
                </p>

                <p className="case-role__value">
                  {item.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}