import Image from "next/image";
import Link from "next/link";

import type {
  HomeProject,
} from "@/data/homeProjects";

import {
  homeProjectMedia,
} from "@/data/homeProjectMedia";

type ProjectRowProps = {
  project: HomeProject;
};

export default function ProjectRow({
  project,
}: ProjectRowProps) {
  const media =
    homeProjectMedia[project.slug];

  return (
    <article className="home-project">
      <div className="home-project__media">
        {media && (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="
              (min-width: 1200px) 337px,
              (min-width: 810px) 267px,
              330px
            "
            className="home-project__image"
          />
        )}
      </div>

      <div className="home-project__info">
        <div className="home-project__top">
          <div
            className="home-project__signal"
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>

          <h3 className="home-project__title">
            {project.title}
          </h3>
        </div>

        <div className="home-project__bottom">
          <p className="home-project__description">
            {project.description}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="home-project__button"
          >
            <span>
              View case
            </span>

            <span
              className="home-project__button-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="home-project__metrics">
        {project.metrics.map(
          (metric) => (
            <div
              className="home-project__metric"
              key={metric.label}
            >
              <div className="home-project__metric-label">
                <span>
                  //
                </span>

                <p>
                  {metric.label}
                </p>
              </div>

              <strong>
                {metric.value}
              </strong>
            </div>
          )
        )}
      </div>
    </article>
  );
}