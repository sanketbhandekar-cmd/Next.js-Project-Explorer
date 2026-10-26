import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-6 py-4 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          About Project Explorer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          A lightweight project management portal built with Next.js App Router.
        </p>
      </div>

      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Overview
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          This portal allows team members to browse company projects, view project details,
          inspect team assignments, track tasks, and view technical documentation.
        </p>
      </div>

      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Key Features
        </h2>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
          <li>Shared application layout with persistent header and footer</li>
          <li>Dedicated dashboard layout with sidebar navigation</li>
          <li>Dynamic and nested routing for project sub-sections (Team, Tasks, Activity)</li>
          <li>Catch-all route for nested project documentation</li>
          <li>Server-side filtering with URL search parameters</li>
          <li>React Suspense streaming for asynchronous data loading</li>
          <li>Route-level loading states and error boundaries</li>
          <li>Client-side theme toggling</li>
        </ul>
      </div>

      <div>
        <Link
          href="/projects"
          className="inline-block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
        >
          Go to Projects →
        </Link>
      </div>
    </div>
  );
}

