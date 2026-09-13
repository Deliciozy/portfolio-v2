import Link from "next/link";
import type { HomeProject } from "@/data/projects";

type ProjectRowProps = {
  project: HomeProject;
};

export default function ProjectRow({
  project,
}: ProjectRowProps) {
  return (
    <article className="project-row">
      <div className="project-row__media">
        <div className="project-row__image-placeholder">
          <span>{project.imageLabel}</span>
        </div>
      </div>

      <div className="project-row__content">
        <div>
          <p className="project-row__marker">///</p>

          <h3 className="project-row__title">
            {project.title}
          </h3>
        </div>

        <div className="project-row__content-bottom">
          <p className="project-row__description">
            {project.description}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="project-row__button"
          >
            View case
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="project-row__metrics">
        {project.metrics.map((metric) => (
          <div
            className="project-row__metric"
            key={metric.label}
          >
            <p className="project-row__metric-label">
              // {metric.label}
            </p>

            <p className="project-row__metric-value">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}