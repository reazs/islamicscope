import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-theme="corporate" className="flex  h-screen text-primary">
      <Sidebar />

      <div className="w-full h-full">
        <Navbar />
        <div className="w-full md:pl-64  h-full">
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
