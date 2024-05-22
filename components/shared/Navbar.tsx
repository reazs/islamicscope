import React from "react";
import { Button } from "../ui/button";
import BrandName from "./BrandName";
import NavbarMenuItems from "./NavbarMenuItems";

const Navbar = () => {
  return (
    <div className="md:hidden inline-block  w-full ">
      <div className="navbar  fixed top-0 left-0 w-full z-50 border-b border-zinc-400">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <NavbarMenuItems />
          </div>
          <BrandName />
        </div>
        <div className="navbar-end">
          <div className="btn btn-outline">Log in</div>
        </div>
      </div>
      <div className="pt-16">{/* Your page content goes here */}</div>
    </div>
  );
};

export default Navbar;
