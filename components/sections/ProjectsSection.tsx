import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ProjectRow from "@/components/project/ProjectRow";
import Reveal from "@/components/motion/Reveal";

import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Section
      id="work"
      size="sm"
      className="projects-section"
    >
      <Container>
        <Reveal
          className="section-heading"
          distance={18}
        >
          <p className="section-kicker">
            // 03 //
          </p>

          <h2 className="section-title">
            My Projects
          </h2>
        </Reveal>

        <StaggerGroup
          className="projects-list"
          stagger={0.1}
          delay={0.05}
        >
          {projects.map((project) => (
            <StaggerItem
              key={project.slug}
              distance={24}
            >
              <ProjectRow
                project={project}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}