"use client";
import React, { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import { Separator } from "../ui/separator";
import CommentCardTile from "./CommentCardTile";
import { IComment } from "@/types";
import { useAddThreadComment } from "@/hooks/useThreads";

const ThreadCommentInput = ({
  comments,
  _id,
}: {
  comments: IComment[];
  _id: string;
}) => {
  const [comment, setComment] = useState("");
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };
  const { mutateAsync: addThreadComment, isPending: addingThreadComment } =
    useAddThreadComment();
  const handleCommentSend = async () => {
    addThreadComment({ comment: comment, threadId: _id });
    setComment("");
  };
  return (
    <div className="space-y-3">
      <Label className="text-2xl font-bold text-muted-foreground">
        Comments
      </Label>
      <div className="flex items-center space-x-3">
        <Input
          className="h-[48px]"
          disabled={addingThreadComment}
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
  );
};

export default ThreadCommentInput;
