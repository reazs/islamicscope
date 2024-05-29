"use client";
import React, { ReactEventHandler } from "react";

import { ISurahs } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { menuItemsSidebar, quranChapters } from "@/constant";
import { CirclePlus, Pen, Plus, Save } from "lucide-react";

const SidebarMenuItems = () => {
  const currentPath = usePathname();

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
          <a>
            <CirclePlus />
            Create Post
          </a>
        </li>
      </SignedIn>
    </ul>
  );
};

export default SidebarMenuItems;

// think is not a good idea
{
  /* menu.herf === "/al-quran" ? (
            <li>
              <details open>
                <summary
                  onClick={(e) => handleClick(e as any)}
                  className={cn(
                    currentPath === "/al-quran" &&
                      "bg-primary-content text-neutral-content hover:text-primary"
                  )}
                >
                  Al Quran
                </summary>
                <ul>
                  <li>
                    <details>
                      <summary>Chapters</summary>
                      <ul>
                        {quranChapters.map((chapter) => (
                          <li>
                            <a>{chapter.englishName}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li> */
}
