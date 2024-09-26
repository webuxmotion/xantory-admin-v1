"use client";

import { useAppContext } from "@/app/context/AppContext";
import {
  AlignJustify,
  LogOut,
  Sunrise,
  Sunset,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const {
    state: { isDarkMode, isSidebarCollapsed },
    dispatch,
  } = useAppContext();

  const toggleSidebar = () => {
    dispatch({
      type: "set_is_sidebar_collapsed",
      value: !isSidebarCollapsed,
    });
  };

  const toggleDarkMode = () => {
    dispatch({
      type: "set_is_dark_mode",
      value: !isDarkMode,
    });
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 pl-10">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <AlignJustify className="w-6 h-6" />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sunrise className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Sunset className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          <div>
            <Link href="/settings" className="p-0">
              <UserRoundCog
                className="cursor-pointer text-gray-500 -mt-1"
                size={24}
              />
            </Link>
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          <div>
            <button>
              <LogOut className="cursor-pointer text-gray-500" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
