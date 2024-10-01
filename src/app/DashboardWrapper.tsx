"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import { AppWrapper, useAppContext } from "@/app/context/AppContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isDarkMode, isSidebarCollapsed },
  } = useAppContext();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light "
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`${
          isSidebarCollapsed ? "pl-5 md:pl-20" : "pl-80"
        } flex flex-col w-full h-full py-7 px-9 bg-gray-50`}
      >
        <Navbar />
        <div className="px-0 md:px-10">{children}</div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppWrapper>
      <DashboardLayout>{children}</DashboardLayout>
    </AppWrapper>
  );
};

export default DashboardWrapper;
