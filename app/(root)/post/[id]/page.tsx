"use client";
import ThreadCommentInput from "@/components/CardTile/ThreadCommentInput";
import ThreadStats from "@/components/CardTile/ThreadStats";
import Loading from "@/components/shared/Loading";
import MediumHeading from "@/components/shared/MediumHeading";
import { Collapsible } from "@/components/ui/collapsible";
import { useGetThreadById } from "@/hooks/useThreads";
import { formatTimestamp } from "@/lib/utils";
import { IComment } from "@/types";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  // const { } = useGetThreadById(params.id)
  const {
    data: thread,
    isPending: loadingThread,
    isError,
  } = useGetThreadById(params.id);
  if (loadingThread) {
    return <Loading />;
  }
  if (isError || !thread) {
    return (
      <div className="h-[90vh] flex items-center justify-center text-zinc-400">
        Thread not found.
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" max-w-screen-lg mx-auto">
        <MediumHeading>{thread.title}</MediumHeading>
        <p className="  leading-7 text-gray-600 [&:not(:first-child)]:mt-6 md:line-clamp line-clamp-5 md:text-base text-sm">
          {thread.content}
        </p>
        <div className="my-10 flex justify-between">
          <div className="flex space-x-5">
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
              <p className="text-zinc-400">
                {formatTimestamp(thread.createdAt)}
              </p>
            </div>
          </div>
          {/* thread stats */}
          <Collapsible>
            <ThreadStats
              content={thread.content}
              title={thread.title}
              user={thread.user}
              _id={thread._id}
              comments={thread.comments as IComment[]}
              likes={thread.likes}
              detailsPage
            />
          </Collapsible>
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
