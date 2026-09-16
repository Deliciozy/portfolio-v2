import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";

import StaggerGroup, {
  StaggerItem,
} from "@/components/motion/StaggerGroup";

import type { ProjectMetric } from "@/data/projects";

type CaseStudyMetricGridProps = {
  title: string;
  body: string[];
  metrics: ProjectMetric[];
};

export default function CaseStudyMetricGrid({
  title,
  body,
  metrics,
}: CaseStudyMetricGridProps) {
  return (
    <section className="case-impact">
      <Container>
        <div className="case-impact__grid">
          <Reveal
            className="case-impact__text"
            distance={20}
          >
            <h2 className="case-section-title">
              {title}
            </h2>

            <div className="case-impact__body">
              {body.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </Reveal>

          <StaggerGroup
            className="case-impact__metrics"
            stagger={0.1}
          >
            {metrics.map((metric) => (
              <StaggerItem
                key={metric.label}
                distance={18}
              >
                <div className="case-impact__metric">
                  <strong>
                    {metric.value}
                  </strong>

                  <span>
                    {metric.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}