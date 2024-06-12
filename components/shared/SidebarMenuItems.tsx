"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";

import { ISurahs } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { menuItemsSidebar, quranChapters } from "@/constant";
import { CirclePlus, Pen, Plus, Save, User } from "lucide-react";

const SidebarMenuItems = () => {
  const currentPath = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading state
  }
  return (
    <ul className="menu  w-64 rounded-box gap-2">
      {menuItemsSidebar.map((menu) => {
        return (
          <>
            {
              <li
                className={cn(
                  menu.herf === currentPath &&
                    "bg-primary-content text-neutral-content rounded-box"
                )}
              >
                <a href={menu.herf}>
                  {menu.icon}
                  {menu.label}
                </a>
              </li>
            }
          </>
        );
      })}

      <SignedIn>
        <li>
          <a>
            <Save />
            Saved
          </a>
        </li>
        <li>
          <a href="/create-post">
            <Plus />
            Create Post
          </a>
        </li>
        <li>
          <a href="/profile">
            <User />
            Profile
          </a>
        </li>
      </SignedIn>
    </ul>
  );
};

export default SidebarMenuItems;
