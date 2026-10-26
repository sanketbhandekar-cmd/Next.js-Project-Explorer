import { Project, FilterParams, DocSection, ProjectActivity } from "./types";
import projectsData from "../data/projects.json";

const projects: Project[] = projectsData as unknown as Project[];

export async function delay(ms: number): Promise<void> {
  if (ms <= 0) return;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch all projects
export async function getAllProjects(): Promise<Project[]> {
  return projects;
}

// Fetch filtered projects based on query parameters (?search=...&status=...)
export async function getFilteredProjects(params: FilterParams): Promise<Project[]> {
  let result = [...projects];

  if (params.search && params.search.trim() !== "") {
    const q = params.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (params.status && params.status !== "all") {
    const s = params.status.toLowerCase();
    result = result.filter((p) => p.status.toLowerCase() === s);
  }

  return result;
}

// Fetch project by ID (simulates failure if id is "error" for Requirement 7)
export async function getProjectById(id: string): Promise<Project | null> {
  if (id === "error") {
    throw new Error("Simulated Server Error: Failed to load project data. Please click Try Again.");
  }
  const found = projects.find((p) => p.id === id);
  return found || null;
}

// Fetch documentation section for catch-all route
export async function getProjectDoc(
  id: string,
  slugSegments: string[] = []
): Promise<{ doc: DocSection; pathStr: string; availableTopics: { title: string; path: string }[] }> {
  const project = await getProjectById(id);
  if (!project) {
    throw new Error(`Project ${id} not found`);
  }

  const pathKey = slugSegments.join("/");
  const doc = project.docs[pathKey];

  const availableTopics = Object.entries(project.docs).map(([key, item]) => ({
    title: item.title,
    path: key === "" ? `/projects/${id}/docs` : `/projects/${id}/docs/${key}`,
  }));

  if (doc) {
    return {
      doc,
      pathStr: pathKey === "" ? "docs" : `docs/${pathKey}`,
      availableTopics,
    };
  }

  // Fallback for custom path segments
  return {
    doc: {
      title: `${slugSegments.join(" / ")} Documentation`,
      summary: `Catch-all documentation route for path: /projects/${id}/docs/${pathKey}`,
      content: `This page is rendered dynamically by the Next.js catch-all route. Requested path segments: [${slugSegments.map((s) => `"${s}"`).join(", ")}].`,
    },
    pathStr: `docs/${pathKey}`,
    availableTopics,
  };
}

// Dashboard immediate metrics
export async function getDashboardStats() {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const allTasks = projects.flatMap((p) => p.tasks);

  return {
    totalProjects: total,
    activeProjects: active,
    completedProjects: completed,
    totalTasks: allTasks.length,
    completedTasks: allTasks.filter((t) => t.status === "completed").length,
  };
}

// Simulated slow data fetch for Suspense streaming requirement (Requirement 8)
export async function getRecentActivityStream(delayMs = 1500): Promise<ProjectActivity[]> {
  await delay(delayMs);
  const activities = projects.flatMap((p) =>
    p.activity.map((a) => ({
      ...a,
      target: `${p.title}: ${a.target}`,
    }))
  );
  return activities;
}
