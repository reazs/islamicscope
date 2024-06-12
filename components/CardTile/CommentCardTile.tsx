"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { IComment } from "@/types";
import { cn, formatRelativeTime, formatTimestamp } from "@/lib/utils";
import { Pen, Trash } from "lucide-react";
import { useUserProfile } from "@/contexts/UserContext";
import {
  useDeleteThreadComment,
  useUpdateThreadComment,
} from "@/hooks/useThreads";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CommentCardTile = ({
  comment,
  threadId,
}: {
  comment: IComment;
  threadId: string;
}) => {
  const { userProfile } = useUserProfile();
  const { mutateAsync: deleteThreadComment, isPending: deletingThreadComment } =
    useDeleteThreadComment();
  const { mutateAsync: updateThreadComment, isPending: updatingThreadComment } =
    useUpdateThreadComment();

  const handleDelete = () => {
    deleteThreadComment({ commentId: comment._id, threadId: threadId });
  };
  const [commentEdit, setCommentEdit] = useState(comment.text);

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentEdit(value);
  };
  const handleSubmitCommentEdit = async () => {
    updateThreadComment({
      threadId: threadId,
      commentId: comment._id,
      newComment: commentEdit,
    });
  };
  return (
    <div className="border-b my-3">
      <div className="mb-3 flex   pb-2  justify-between">
        <div className="flex space-x-2 items-start">
          <div className="min-w-[56px] min-h-[56px]">
            <Image
              className=" mask mask-circle bg-zinc-300"
              src={comment.user.imageUrl}
              alt="avatar-img"
              height={56}
              width={56}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Label>{comment.user.username}</Label>
              <p className="text-zinc-400">
                {formatRelativeTime(comment.createdAt)}
              </p>
            </div>
            <p className="">
              {comment.text}{" "}
              {comment.edited && (
                <span className="text-zinc-400">{"(Edited)"}</span>
              )}
            </p>
          </div>
        </div>
        {/* deleting user comment and editing it */}
        {userProfile?.email === comment.user.email && (
          <div className="flex justify-center items-center text-zinc-400 group space-x-2">
            <Trash
              onClick={() => handleDelete()}
              className={cn(" cursor-pointer hover:text-destructive")}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Pen className=" cursor-pointer hover:text-primary" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Comment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="comment"
                      disabled={updatingThreadComment ? true : false}
                      onChange={(e) => handleChangeComment(e)}
                      defaultValue={comment.text}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => handleSubmitCommentEdit()}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCardTile;
