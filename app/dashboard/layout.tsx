import React from "react";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start py-4">
      {/* Sidebar applies only to dashboard pages */}
      <DashboardSidebar />

      {/* Main dashboard content */}
      <div className="flex-1 w-full space-y-6">{children}</div>
    </div>
  );
}
