"use client";

import React from "react";
import { Menu } from "lucide-react";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const session = Cookies.get("auth");

  const auth = React.useMemo(() => {
    if (session) {
      return JSON.parse(session);
    }
    return null;
  }
  , [session]);

  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("auth");
    
    router.push("/login");
  }

  return (
    <nav className="px-12 sm:px-8 py-4 sm:py-6 bg-white flex flex-wrap items-center justify-between shadow-sm">
      <div className="flex items-center">
        {/* Menu toggle button for mobile */}
        <button
          onClick={toggleSidebar}
          className="mr-4 lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>

        <div>
          <span className="text-gray-600 text-sm sm:text-base">Hi</span>
          <span className="text-gray-800 font-bold ml-1 text-sm sm:text-base">
            {auth?.name ?? "Admin"}
          </span>
          <div className="text-indigo-500 text-xs mt-1 font-semibold">
          </div>
        </div>
      </div>

      <div className="flex items-center text-gray-500 space-x-4 sm:space-x-8 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
        <div className="hidden sm:flex items-center space-x-4 sm:space-x-8">
          <Dropdown
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900/50 to-zinc-900/30 backdrop-blur-md backdrop-opacity-30",
              base: "bg-white rounded-lg shadow-lg border border-zinc-200",
            }}
            motionProps={{
              variants: {
                enter: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  opacity: 0,
                  y: 20,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              },
            }}
          >
            <DropdownTrigger>
              <Button variant="bordered" className="cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="w-48 px-2 text-neutral-500"
            >
              <DropdownItem className="my-2 hover:bg-gray-100 py-1" key="logout" onPress={logoutHandler}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
