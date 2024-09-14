"use client";
 
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { setIsSidebarCollapsed } from "@/redux/state";
import {
  LayoutDashboard,
  LucideIcon,
  Menu,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
 
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}
 
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
 
  return (
    <Link href={href}>
      <div
        className={`text-lg font-semibold cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        text-gray-700 hover:text-gray-900 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200" : ""
        }
      }`}
      >
        <Icon className="w-7 h-7"/>
 
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
 
const Sidebar = () => {
  const dispatch = useAppDispatch();
 
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
 
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
 
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-80"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
 
  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Link
          href="/"
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-3xl`}
        >
          XANTORY
        </Link>

        <Link
          href="/"
          className={`${
            isSidebarCollapsed ? "block" : "hidden"
          } font-extrabold text-3xl`}
        >
          X
        </Link>
 
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
 
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={UserRoundCog}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
 
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-lg text-gray-500">{new Date().getFullYear()} &#128526; Xantory Admin</p>
      </div>
    </div>
  );
};
 
export default Sidebar;