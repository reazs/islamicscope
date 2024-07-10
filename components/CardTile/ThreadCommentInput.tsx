"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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
  const [displayCount, setDisplayCount] = useState(5); // Initial display count
  const [allComments, setAllComments] = useState<IComment[]>([]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const { mutateAsync: addThreadComment, isPending: addingThreadComment } =
    useAddThreadComment();

  const handleCommentSend = async () => {
    await addThreadComment({ comment: comment, threadId: _id });
    setComment("");
    setDisplayCount((prevCount) => prevCount + 1); // Increase display count to show the new comment
  };

  const handleLoadMoreComments = () => {
    setDisplayCount((prevCount) => prevCount + 5); // Increment display count by 5
  };

  useEffect(() => {
    setAllComments([...comments].reverse());
  }, [comments]);

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
          placeholder="Share your thoughts..."
        />
        <div
          onClick={handleCommentSend}
          className="btn btn-outline rounded-sm hover:text-white"
        >
          <Send />{" "}
        </div>
      </div>

      <Separator />
      {/* show comments based on displayCount */}
      <div>
        {allComments &&
          allComments
            .slice(0, displayCount)
            .map((comment, index) => (
              <CommentCardTile
                key={comment.text + index}
                comment={comment}
                threadId={_id}
              />
            ))}
        {displayCount < allComments.length && (
          <p
            onClick={handleLoadMoreComments}
            className="text-zinc-400 hover:text-primary text-end hover:underline cursor-pointer"
          >
            Load more comments
          </p>
        )}
      </div>
    </div>
  );
};

export default ThreadCommentInput;
