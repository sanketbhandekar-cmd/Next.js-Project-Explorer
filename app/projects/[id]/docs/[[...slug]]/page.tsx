import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, getProjectDoc } from "@/lib/projects";

export default async function ProjectDocsCatchAllPage({
  params,
}: {
  params: Promise<{ id: string; slug?: string[] }>;
}) {
  const { id, slug } = await params;
  const slugSegments = slug || [];

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const { doc, pathStr, availableTopics } = await getProjectDoc(id, slugSegments);
  const fullRequestedUrl = `/projects/${id}/${pathStr}`;

  return (
    <div className="space-y-4">
      {/* Complete path display (Requirement 4) */}
      <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-xs font-mono text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-slate-500">Requested Path: </span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{fullRequestedUrl}</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Route Segments: [{slugSegments.map((s) => `"${s}"`).join(", ")}]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Navigation of available documentation sections */}
        <aside className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Topics
          </div>
          <nav className="space-y-1 text-xs">
            {availableTopics.map((topic) => {
              const active =
                topic.path === `/projects/${id}/docs/${slugSegments.join("/")}` ||
                (slugSegments.length === 0 && topic.path === `/projects/${id}/docs`);
              return (
                <Link
                  key={topic.path}
                  href={topic.path}
                  className={`block px-2.5 py-1.5 rounded transition ${
                    active
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {topic.title}
                </Link>
              );
            })}
          </nav>

        </aside>

        {/* Rendered content based on route segments */}
        <div className="md:col-span-3 p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {doc.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{doc.summary}</p>
          </div>

          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
            {doc.content}
          </div>
        </div>
      </div>
    </div>
  );
}
