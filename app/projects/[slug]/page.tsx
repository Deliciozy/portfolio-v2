import { notFound } from "next/navigation";

import ProjectCaseStudy from "@/components/project/ProjectCaseStudy";

import {
  getNextProject,
  getProjectBySlug,
  projects,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject =
    getNextProject(slug);

  return (
    <ProjectCaseStudy
      project={project}
      nextProject={nextProject}
    />
  );
}