import React from "react";
import { ActivityPanel } from "@/components/ui/ActivityPanel";
import Sidebar from "@/components/ui/Sidebar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <div className="grid grid-cols-[1fr_20rem]">
          {children}
          <ActivityPanel />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
