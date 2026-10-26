import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";
import ProjectNavTabs from "./components/ProjectNavTabs";

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 py-4">
      {/* Back link */}
      <div>
        <Link
          href="/projects"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to All Projects
        </Link>
      </div>

      {/* Shared Nested Project Header */}
      <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                {project.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                ID: {project.id}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {project.title}
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {project.summary}
        </p>

        {/* Navigation Tabs (Shared across all sub-pages) */}
        <ProjectNavTabs projectId={project.id} />
      </div>

      {/* Subpage content */}
      <div>{children}</div>
    </div>
  );
}
