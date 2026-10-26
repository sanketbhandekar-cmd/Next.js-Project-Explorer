import React from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";

export default async function ProjectActivityPage({
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
    <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Activity Log
        </h2>
        <span className="text-xs text-slate-500">
          {project.activity.length} updates recorded
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {project.activity.map((item) => (
          <div key={item.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white mr-1.5">
                {item.user}
              </span>
              <span className="text-slate-500">{item.action}</span>
              <div className="text-slate-700 dark:text-slate-300 font-mono text-[11px] mt-0.5">
                {item.target}
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
