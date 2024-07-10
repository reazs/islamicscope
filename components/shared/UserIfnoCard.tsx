"use client";
import { useUserProfile } from "@/contexts/UserContext";
import { UserButton } from "@clerk/nextjs";

import React from "react";

const UserIfnoCard = () => {
  const { userProfile } = useUserProfile();
  if (!userProfile) {
    return (
      <div className="flex justify-between items-center mt-5">
        <div className="w-[40px] h-[40px] flex items-center">
          <div className="w-[40px] h-[40px] bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex  justify-between items-center mt-5">
      <div className="w-[40px] h-[40px] flex items-center">
        <UserButton />
      </div>
      <div>
        <h1 className="text-xs text-foreground">{userProfile.username + ""}</h1>
        <p className="text-xs text-muted-foreground">
          {userProfile.email + ""}
        </p>
      </div>
    </div>
  );
};

export default UserIfnoCard;
