import Container from "@/components/layout/Container";
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
          <div className="case-impact__text">
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
          </div>

          <div className="case-impact__metrics">
            {metrics.map((metric) => (
              <div
                className="case-impact__metric"
                key={metric.label}
              >
                <strong>
                  {metric.value}
                </strong>

                <span>
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}