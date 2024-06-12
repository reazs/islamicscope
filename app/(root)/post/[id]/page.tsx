"use client";
import ThreadCommentInput from "@/components/CardTile/ThreadCommentInput";
import Loading from "@/components/shared/Loading";
import MediumHeading from "@/components/shared/MediumHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetThreadById } from "@/hooks/useThreads";
import { formatTimestamp } from "@/lib/utils";
import { IComment } from "@/types";
import { Send, Share } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  // const { } = useGetThreadById(params.id)
  console.log(params.id);
  const { data: thread, isPending: loadingThread } = useGetThreadById(
    params.id
  );
  if (loadingThread) {
    return <Loading />;
  }
  if (!thread) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" max-w-screen-lg mx-auto">
        <MediumHeading>{thread.title}</MediumHeading>
        <p className="  leading-7 text-gray-600 [&:not(:first-child)]:mt-6 md:line-clamp line-clamp-5 md:text-base text-sm">
          {thread.content}
        </p>
        <div className="my-10 flex space-x-5">
          <Image
            src={thread.user.imageUrl}
            height={56}
            width={56}
            alt="profile-img"
          />
          <div>
            <h3 className="text-zinc-400 font-bold text-xl">
              @{thread.user.username}
            </h3>
            <p className="text-zinc-400">{formatTimestamp(thread.createdAt)}</p>
          </div>
        </div>

        <ThreadCommentInput
          comments={thread.comments as IComment[]}
          _id={thread._id}
        />
      </div>
    </div>
  );
};

export default page;
