import React from "react";
import BrandName from "./BrandName";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import UserIfnoCard from "./UserIfnoCard";

import SidebarMenuItems from "./SidebarMenuItems";
const Sidebar = () => {
  return (
    <div className="md:flex overflow-y-auto  fixed light:bg-base-200  z-40 flex-col justify-between items-center hidden border-r border-zinc-400  h-full">
      <div className="mt-10 ">
        <div>
          <BrandName />
          <SignedIn>
            <UserIfnoCard />
          </SignedIn>
        </div>
      </div>
      {/* menu items */}
      <SidebarMenuItems />
      <div className="mb-10 w-full flex  justify-center items-center">
        <SignedIn>
          <SignOutButton>
            <div className="btn btn-outline">Log out</div>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <a href="/sign-in" className="btn btn-outline">
            Log in
          </a>
        </SignedOut>
      </div>
    </div>
  );
};

export default Sidebar;
