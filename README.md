# Requirements and Implementation Details

* **Requirement 1: Application Structure**
  * Built using the Next.js App Router with 5 dedicated sections:
    * **Home** (`app/page.tsx`): Overview of the portal with quick action links.
    * **About** (`app/about/page.tsx`): Summary of the application and implemented features.
    * **Dashboard** (`app/dashboard/page.tsx`): Central hub with metrics and streaming activity.
    * **Projects** (`app/projects/page.tsx`): Project directory with search and filter capabilities.
    * **Settings** (`app/settings/page.tsx`): User profile information and theme preferences.

* **Requirement 2: Common Application Layout**
  * Implemented in `app/layout.tsx` to provide a consistent layout across all pages.
  * Shared header (`components/Header.tsx`) with active navigation links to all sections and a theme toggle.
  * Shared footer (`components/Footer.tsx`) with application links.
  * Shared layout persists across client-side navigation without re-rendering.

* **Requirement 3: Dashboard Experience**
  * Dedicated dashboard layout (`app/dashboard/layout.tsx`) that applies exclusively to dashboard pages.
  * Sidebar navigation (`app/dashboard/components/DashboardSidebar.tsx`) with links to the dashboard and project shortcuts.
  * Renders dashboard-specific metrics (total projects, active projects, completed tasks) alongside a live activity stream.

* **Requirement 4: Projects Module & Nested Dynamic Routing**
  * Project listing (`app/projects/page.tsx`) displays all available projects with title, status, summary, and lead.
  * Project details page uses dynamic routing (`/projects/[id]`).
  * Shared nested layout (`app/projects/[id]/layout.tsx`) displays common project header information and navigation tabs.
  * Organized into nested routes:
    * **Overview** (`/projects/[id]` -> `app/projects/[id]/page.tsx`): Description, category, lead, and progress.
    * **Team** (`/projects/[id]/team` -> `app/projects/[id]/team/page.tsx`): Assigned team members, roles, and emails.
    * **Tasks** (`/projects/[id]/tasks` -> `app/projects/[id]/tasks/page.tsx`): Sprint tasks with assignees, due dates, and statuses.
    * **Activity** (`/projects/[id]/activity` -> `app/projects/[id]/activity/page.tsx`): Project update and activity log.
  * Catch-all route (`/projects/[id]/docs/[[...slug]]` -> `app/projects/[id]/docs/[[...slug]]/page.tsx`):
    * Handles documentation paths (e.g., `/projects/1/docs/setup/database`).
    * Displays the complete requested path URL and the route segments array.
    * Renders documentation topics and section content.

* **Requirement 5: Server and Client Component Architecture**
  * Implemented search and status filtering via URL query parameters on the Projects page:
    * `/projects?search=nextjs`
    * `/projects?status=active`
    * `/projects?search=dashboard&status=completed`
  * Filter parameters are read on the server (`searchParams` in `app/projects/page.tsx`) to filter results before rendering.
  * Client filter bar (`components/ProjectFilterBar.tsx`) synchronizes user input with URL search parameters while preserving active filters.

* **Requirement 6: Loading Experience**
  * Utilizes the App Router built-in loading mechanism (`loading.tsx`) to display immediate visual feedback:
    * `app/dashboard/loading.tsx` for the dashboard route.
    * `app/projects/loading.tsx` for the projects directory.
    * `app/projects/[id]/loading.tsx` for project detail subpages.

* **Requirement 7: Error Handling**
  * Implemented route-specific and global error boundaries using `error.tsx`:
    * `app/projects/error.tsx` for projects directory failures.
    * `app/projects/[id]/error.tsx` for project detail failures.
    * `app/error.tsx` for global application errors.
  * Displays a friendly error message and a "Try Again" button that triggers `reset()` to re-render without crashing the application.
  * Simulated server failure triggerable at `/projects/error` or via the footer "Test Error" link.

* **Requirement 8: Streaming User Interface**
  * Implemented React Suspense streaming on the dashboard (`app/dashboard/page.tsx`).
  * Metric summary cards are rendered immediately on the server.
  * Server Component `RecentActivityStream.tsx` simulates a slow data fetch (1.5s delay) and is wrapped in a `<Suspense>` boundary with a fallback placeholder.
  * The rest of the dashboard remains interactive and does not block waiting for the slow component.

* **Requirement 9: Client-side Interactivity**
  * Implemented a client-side theme toggle component (`components/ThemeToggle.tsx`) in the header and settings page.
  * Toggles between Light and Dark mode using React client state and `useSyncExternalStore`.
  * Demonstrates client-side behavior after hydration and persists the selected preference in `localStorage`.

---

## Project Structure

```
project-explorer/
├── app/
│   ├── about/
│   │   └── page.tsx                         # About section (Req 1)
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── DashboardSidebar.tsx         # Dashboard sidebar navigation (Req 3)
│   │   │   └── RecentActivityStream.tsx     # Suspense streaming Server Component (Req 8)
│   │   ├── layout.tsx                       # Dedicated dashboard layout (Req 3)
│   │   ├── loading.tsx                      # Dashboard loading state (Req 6)
│   │   └── page.tsx                         # Dashboard central hub (Req 3, 8)
│   ├── projects/
│   │   ├── [id]/
│   │   │   ├── activity/page.tsx            # Project Activity nested route (Req 4)
│   │   │   ├── components/
│   │   │   │   └── ProjectNavTabs.tsx       # Shared project navigation tabs (Req 4)
│   │   │   ├── docs/[[...slug]]/page.tsx    # Catch-all documentation route (Req 4)
│   │   │   ├── tasks/page.tsx               # Project Tasks nested route (Req 4)
│   │   │   ├── team/page.tsx                # Project Team nested route (Req 4)
│   │   │   ├── error.tsx                    # Project error boundary (Req 7)
│   │   │   ├── layout.tsx                   # Nested project layout (Req 4)
│   │   │   ├── loading.tsx                  # Project loading state (Req 6)
│   │   │   └── page.tsx                     # Project Overview page (Req 4)
│   │   ├── error.tsx                        # Projects directory error boundary (Req 7)
│   │   ├── loading.tsx                      # Projects loading state (Req 6)
│   │   └── page.tsx                         # Projects listing with search/status filters (Req 4, 5)
│   ├── settings/
│   │   └── page.tsx                         # Settings section (Req 1, 9)
│   ├── error.tsx                            # Root error boundary (Req 7)
│   ├── globals.css                          # Minimal global CSS tokens and Tailwind setup
│   ├── layout.tsx                           # Common root layout with header & footer (Req 2)
│   └── page.tsx                             # Home page (Req 1)
├── components/
│   ├── Footer.tsx                           # Shared footer (Req 2)
│   ├── Header.tsx                           # Shared header with navigation & theme toggle (Req 2)
│   ├── ProjectCard.tsx                      # Minimal project card component
│   ├── ProjectFilterBar.tsx                 # Search & status query param filter bar (Req 5)
│   └── ThemeToggle.tsx                      # Client-side theme toggler (Req 9)
├── data/
│   └── projects.json                        # Local project dataset with required team members
├── lib/
│   ├── projects.ts                          # Server-side data fetching and filter utilities
│   └── types.ts                             # Minimal TypeScript interfaces
├── README.md
├── package.json
└── tsconfig.json
```

