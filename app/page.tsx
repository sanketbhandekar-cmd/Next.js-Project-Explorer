import React from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6 py-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Project Explorer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          A lightweight project management portal to browse projects, view details, track tasks, and explore documentation.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/projects"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
        >
          View Projects →
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          View Dashboard
        </Link>
      </div>

      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Quick Overview
        </h2>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
          <li>Total active and tracked projects: <strong>{projects.length}</strong></li>
          <li>Server-side filtering by search query and project status</li>
          <li>Nested routing for Overview, Team, Tasks, and Activity logs</li>
          <li>Catch-all documentation route (<code>/projects/[id]/docs/[[...slug]]</code>)</li>
          <li>React Suspense streaming on the Dashboard</li>
        </ul>
      </div>
    </div>
  );
}

