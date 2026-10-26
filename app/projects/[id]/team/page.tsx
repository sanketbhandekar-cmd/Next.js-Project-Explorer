import React from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";

export default async function ProjectTeamPage({
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
          Team Members
        </h2>
        <span className="text-xs text-slate-500">
          {project.team.length} Assigned Engineers
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {project.team.map((member) => (
          <div key={member.id || member.email} className="py-3 flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {member.name}
              </div>
              <div className="text-slate-500">{member.role}</div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {member.department}
              </span>
              <div className="text-[11px] text-slate-400 mt-1">
                <a href={`mailto:${member.email}`} className="hover:underline">
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
