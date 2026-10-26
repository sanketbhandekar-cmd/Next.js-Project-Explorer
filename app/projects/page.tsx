import React from "react";
import Link from "next/link";
import { getFilteredProjects } from "@/lib/projects";
import ProjectFilterBar from "@/components/ProjectFilterBar";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "all";

  // Filter projects based on query parameters (Requirement 5)
  const filteredProjects = await getFilteredProjects({
    search,
    status,
  });

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Projects Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore company projects. Use query parameters to search and filter records.
        </p>
      </div>

      {/* Filter bar for query parameters */}
      <ProjectFilterBar currentSearch={search} currentStatus={status} />

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-lg space-y-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No projects found matching the current filters.
          </p>
          <Link
            href="/projects"
            className="inline-block text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
