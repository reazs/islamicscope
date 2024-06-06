"use client";
import React, { useEffect, useState } from "react";
import {
  Delete,
  Heart,
  MessageCircleMore,
  Share2Icon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { IThread } from "@/types";
import { useUserProfile } from "@/contexts/UserContext";
import Loading from "../shared/Loading";
import { useDeleteThread } from "@/hooks/useThreads";
import { formatTimestamp } from "@/lib/utils";

const ThreadCardTile = ({ title, content, user, _id, createdAt }: IThread) => {
  const { userProfile } = useUserProfile();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [createdTime, setCreatedTime] = useState("");
  const { mutateAsync: deleteThread, isPending: isLoading } = useDeleteThread();
  useEffect(() => {
    if (userProfile && userProfile.email === user.email) {
      setIsCurrentUser(true);
    }
    const formatedTime = formatTimestamp(createdAt);
    setCreatedTime(formatedTime);
  }, [userProfile, user.email, createdTime]);

  if (!userProfile) {
    return <Loading />;
  }
  const handleClick = async (id: string) => {
    await deleteThread(id);
  };
  return (
    <div className="max-w-screen-lg shadow-lg p-5 rounded-md bg-white mx-auto my-5">
      <div className="w-full flex space-x-5">
        <div className="h-full grid grid-cols-[auto,1fr] items-stretch">
          <div className="flex flex-col justify-center items-center my-6">
            <Image
              src={user.imageUrl}
              className="rounded-md bg-zinc-300 "
              alt="profile-img"
              width={50}
              height={50}
            />
            <div className="h-full border-r-2 border-gray-300 my-3" />
          </div>
          <div className="p-4 flex items-center">
            <div>
              <h3 className="md:text-2xl text-xl text-muted-foreground font-bold font-josefin-sans text-gray-800 mb-2">
                @{user.username}
              </h3>
              <div>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                  {title}
                </h4>
                <p className="leading-7 text-gray-600 [&:not(:first-child)]:mt-6 md:line-clamp line-clamp-5 md:text-base text-sm">
                  {content}
                </p>
              </div>

              {/* threads stats */}
              <div className="flex space-x-4 my-3 ">
                <Heart className=" text-rose-500" /> <MessageCircleMore />{" "}
                <Share2Icon className=" text-blue-400" />
                {isCurrentUser && (
                  <>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <Trash
                        className=" cursor-pointer"
                        onClick={() => handleClick(_id)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">{createdTime}</p>
    </div>
  );
};

export default ThreadCardTile;
