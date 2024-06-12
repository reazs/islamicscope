"use client";
import Image from "next/image";
import React from "react";
import Loading from "../shared/Loading";
import { useRouter } from "next/navigation";
import { useGetCurrentUserProfile } from "@/hooks/useThreads";

const UserProfileCard = () => {
  const { data: userProfile, isLoading, isError } = useGetCurrentUserProfile();
  const rotuer = useRouter();
  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && !userProfile) {
    rotuer.push("/onboarding");
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="h-[300px] flex justify-center items-center">
        <p>Failed to get user Profile error occurred</p>
      </div>
    );
  }

  return (
    <div className="border-b-2 py-5">
      <h2 className="text-4xl font-bold font-josefin-sans">Profile</h2>
      <div className="flex md:flex-row flex-col items-center space-x-4">
        <Image
          className="rounded-md md:mb-0 mb-5"
          src={userProfile?.imageUrl as string}
          alt="profile-img"
          width={200}
          height={200}
        />
        <div className="max-w-screen-md flex flex-col justify-around">
          <h3>
            <strong className="text-muted-foreground">Username:</strong>{" "}
            {userProfile?.username}
          </h3>
          <h3>
            <strong className="text-muted-foreground">Email:</strong>{" "}
            {userProfile?.email}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
