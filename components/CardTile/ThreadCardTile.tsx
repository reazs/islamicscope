"use client";
import React, { ChangeEvent, EventHandler, useEffect, useState } from "react";
import {
  Delete,
  Heart,
  MessageCircleMore,
  Reply,
  Send,
  Share2Icon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { IThread } from "@/types";
import { useUserProfile } from "@/contexts/UserContext";
import Loading from "../shared/Loading";
import { useDeleteThread, useAddThreadComment } from "@/hooks/useThreads";
import { cn, formatTimestamp } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommentCardTile from "./CommentCardTile";
import Link from "next/link";
import { Button } from "../ui/button";
const ThreadCardTile = ({
  title,
  content,
  user,
  _id,
  createdAt,
  comments,
}: IThread) => {
  const { userProfile } = useUserProfile();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [createdTime, setCreatedTime] = useState("");
  const { mutateAsync: deleteThread, isPending: isLoading } = useDeleteThread();
  const [comment, setComment] = useState("");
  const { mutateAsync: addThreadComment, isPending: addingThreadComment } =
    useAddThreadComment();
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
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleCommentSend = async () => {
    addThreadComment({ comment: comment, threadId: _id });
    setComment("");
  };
  return (
    <Collapsible>
      <div className="max-w-screen-lg shadow-lg p-5 rounded-md bg-white mx-auto my-5">
        <div className="w-full flex space-x-5 ">
          <div className="h-full  grid grid-cols-[auto,1fr] items-stretch">
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
            <div className="p-4 flex  items-center ">
              <div className="">
                <h3 className="md:text-2xl text-xl text-muted-foreground font-bold font-josefin-sans text-gray-800 mb-2">
                  @{user.username}
                </h3>
                <div className="grow ">
                  <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                    {title}
                  </h4>
                  <p className="  leading-7 text-gray-600 [&:not(:first-child)]:mt-6 md:line-clamp line-clamp-5 md:text-base text-sm">
                    {content}
                  </p>
                  <Button className="p-0" variant={"link"}>
                    <Link href={""}>View Details</Link>
                  </Button>
                </div>

                {/* threads stats */}
                <div className="flex my-4 justify-between items-center">
                  <div className="flex space-x-4">
                    <Heart className=" text-rose-500" />{" "}
                    <CollapsibleTrigger>
                      <MessageCircleMore />{" "}
                    </CollapsibleTrigger>
                    <Share2Icon className=" text-blue-400" />
                    {isCurrentUser && (
                      <>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <Trash
                            className={cn(" cursor-pointer")}
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
        </div>
        <p className="text-sm text-gray-500">{createdTime}</p>
      </div>

      <CollapsibleContent className="">
        {/* */}

        <div className=" max-w-screen-lg shadow-lg p-5 rounded-md bg-white mx-auto my-5 space-y-5">
          <Label className="text-2xl font-bold text-muted-foreground">
            Comments
          </Label>
          <div className="flex items-center space-x-3">
            <Input
              value={comment}
              onChange={(e) => handleCommentChange(e)}
              placeholder="Share you're thoughts..."
            />
            <div
              onClick={() => handleCommentSend()}
              className="btn btn-outline rounded-sm hover:text-white"
            >
              <Send />{" "}
            </div>
          </div>

          <Separator />
          {/* show 5 recent comments */}
          <div>
            {comments &&
              comments.map((comment, index) => (
                <CommentCardTile key={index} comment={comment} threadId={_id} />
              ))}

            <p className="text-zinc-400 hover:text-primary text-end hover:underline cursor-pointer">
              Load more comments
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ThreadCardTile;
