import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import ProjectRow from "@/components/project/ProjectRow";
import SectionHeading from "@/components/ui/SectionHeading";

import {
  homeProjects,
} from "@/data/homeProjects";

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="home-projects"
    >
      <div className="home-section-container">
        <SectionHeading
          index="03"
          title="My Projects"
        />

        <StaggerGroup
          className="home-projects__list"
          stagger={0.08}
        >
          {homeProjects.map(
            (project) => (
              <StaggerItem
                key={project.slug}
                distance={60}
                className="home-project-wrap"
              >
                <ProjectRow
                  project={project}
                />
              </StaggerItem>
            )
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}