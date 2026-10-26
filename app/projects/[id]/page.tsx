import React from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Project Overview
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <span className="text-slate-500">Category</span>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              {project.category}
            </div>
          </div>
          <div className="p-3 rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <span className="text-slate-500">Project Lead</span>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              {project.lead.name} ({project.lead.role})
            </div>
          </div>
          <div className="p-3 rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <span className="text-slate-500">Sprint Progress</span>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              {project.progress}%
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
