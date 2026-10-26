import React, { Suspense } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/projects";
import RecentActivityStream from "./components/RecentActivityStream";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Central hub for monitoring projects and streaming activity.
        </p>
      </div>

      {/* Immediate Metrics Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500">Total Projects</div>
          <div className="text-xl font-bold mt-1 text-slate-900 dark:text-white">
            {stats.totalProjects}
          </div>
        </div>
        <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500">Active Projects</div>
          <div className="text-xl font-bold mt-1 text-emerald-600">
            {stats.activeProjects}
          </div>
        </div>
        <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500">Completed Tasks</div>
          <div className="text-xl font-bold mt-1 text-blue-600">
            {stats.completedTasks} / {stats.totalTasks}
          </div>
        </div>
      </div>

      {/* Streaming User Interface (Requirement 8) */}
      <div className="space-y-2">
        <Suspense
          fallback={
            <div className="p-6 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs text-slate-500 animate-pulse">
              Loading recent activity stream...
            </div>
          }
        >
          <RecentActivityStream />
        </Suspense>
      </div>

      <div className="pt-2">
        <Link
          href="/projects"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Go to Projects list
        </Link>
      </div>
    </div>
  );
}

