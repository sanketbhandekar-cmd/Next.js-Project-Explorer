import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
          {project.status}
        </span>
        <span className="text-slate-400">ID: {project.id}</span>
      </div>

      <h3 className="font-bold text-base text-slate-900 dark:text-white">
        <Link href={`/projects/${project.id}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>

      <p className="text-xs text-slate-600 dark:text-slate-400">
        {project.summary}
      </p>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Lead: {project.lead.name}</span>
        <Link
          href={`/projects/${project.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

