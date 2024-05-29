import { menuItemsSidebar, quranChapters } from "@/constant";
import { cn } from "@/lib/utils";
import React from "react";

const NavbarMenuItems = () => {
  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      {menuItemsSidebar.map((menu, index) => (
        <>
          {
            <li>
              <a href={menu.herf}>
                {menu.icon}
                {menu.label}
              </a>
            </li>
          }
        </>
      ))}
    </ul>
  );
};

export default NavbarMenuItems;
