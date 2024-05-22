"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import React from "react";

const UserIfnoCard = () => {
  const { user } = useUser();
  if (!user) {
    return;
  }
  console.log(user);
  return (
    <div className="flex  justify-between items-center mt-5">
      <div className="w-[40px] h-[40px] flex items-center">
        <UserButton />
      </div>
      <div>
        <h1 className="text-xs text-foreground">{user.username + ""}</h1>
        <p className="text-xs text-muted-foreground">
          {user.emailAddresses + ""}
        </p>
      </div>
    </div>
  );
};

export default UserIfnoCard;
