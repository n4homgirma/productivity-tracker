import type React from "react";
import NavBar from "../components/NavBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}
