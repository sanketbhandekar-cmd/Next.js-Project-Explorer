import React from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";

export default async function ProjectTasksPage({
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
          Sprint Tasks
        </h2>
        <span className="text-xs text-slate-500">
          {project.tasks.length} tasks scheduled
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {project.tasks.map((task) => (
          <div
            key={task.id}
            className="py-2.5 flex items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {task.title}
              </span>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Assignee: {task.assignee} • Due: {task.dueDate}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                  task.status === "completed"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
