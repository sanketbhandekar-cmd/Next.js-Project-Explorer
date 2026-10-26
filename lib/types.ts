export type ProjectStatus = "active" | "in-progress" | "completed" | "planning";

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  email: string;
  department: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
}

export interface ProjectActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface DocSection {
  title: string;
  summary: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  status: ProjectStatus;
  priority: "High" | "Medium" | "Low";
  progress: number;
  lead: TeamMember;
  team: TeamMember[];
  tasks: ProjectTask[];
  activity: ProjectActivity[];
  docs: Record<string, DocSection>;
}

export interface FilterParams {
  search?: string;
  status?: string;
}
