"use client";
import { SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { menuItemsSidebar } from "@/constant";
import { Save, Plus, User } from "lucide-react";

const SidebarMenuItems = () => {
  const currentPath = usePathname();

  return (
    <ul className="menu w-64 rounded-box gap-2">
      {menuItemsSidebar.map((menu, index) => (
        <li
          key={menu.herf + index}
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
      ))}

      <SignedIn>
        <li>
          <a href="/saved">
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
