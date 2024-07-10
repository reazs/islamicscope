"use client";
import { Heart, MessageCircleMore, Pen, Share2Icon, Trash } from "lucide-react";
import { CollapsibleTrigger } from "../ui/collapsible";
import Loading from "../shared/Loading";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useUserProfile } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useDeleteThread, useUpdateThreadLike } from "@/hooks/useThreads";
import { IComment, IUser } from "@/types";
import { useRouter } from "next/navigation";
import EditThreadFormModal from "../forms/EditThreadFormModal";

const ThreadStats = ({
  user,
  title,
  content,
  _id,
  detailsPage = false,
  comments,
  likes,
}: {
  user: IUser;
  title: string;
  content: string;
  _id: string;
  comments: IComment[];
  likes?: IUser[];
  detailsPage?: boolean;
}) => {
  const { userProfile } = useUserProfile();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { mutateAsync: deleteThread, isPending: isLoading } = useDeleteThread();
  const {
    mutateAsync: updateLike,
    isPending: updatingLike,
    isError: updateLikeError,
  } = useUpdateThreadLike();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(true);
  const currentUserEmail = userProfile?.email;
  useEffect(() => {
    if (userProfile && userProfile.email === user.email) {
      setIsCurrentUser(true);
    }

    if (likes) {
      const likeIndex = likes.findIndex(
        (like) => like.email === currentUserEmail
      );
      if (likeIndex > -1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [userProfile, user.email, likes]);

  const handleClick = async (id: string) => {
    await deleteThread(id)
      .then(() => {
        setDialogOpen(false);
      })
      .then(() => {
        if (detailsPage) {
          router.push("/explore");
        }
      });
  };
  const handleLikeClick = () => {
    updateLike({ threadId: _id, userEmail: currentUserEmail as string });
  };
  return (
    <div className="flex justify-end  items-center space-x-4">
      <div className="flex space-x-1">
        <p className="text-xl text-zinc-500">{likes?.length}</p>
        {isLiked ? (
          <Heart
            onClick={() => handleLikeClick()}
            fill="red"
            className=" text-rose-500 cursor-pointer"
          />
        ) : (
          <Heart
            onClick={() => handleLikeClick()}
            className=" cursor-pointer"
          />
        )}
      </div>
      <CollapsibleTrigger disabled={detailsPage}>
        <div className="flex space-x-1">
          <p className="text-xl text-zinc-500"> {comments.length}</p>
          <MessageCircleMore />
        </div>
      </CollapsibleTrigger>
      <Share2Icon className=" text-blue-400" />
      {isCurrentUser && (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>
                  <Trash className={cn(" cursor-pointer")} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-red-500">
                    Are you sure you want to delete this post?
                  </DialogHeader>

                  <Label>{title}</Label>
                  <p className="  leading-7 text-gray-600 [&:not(:first-child)]:mt-1 md:line-clamp line-clamp-5 md:text-base text-sm">
                    {content}
                  </p>

                  <DialogFooter>
                    <div
                      onClick={() => {
                        setDialogOpen(false);
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </div>
                    <div
                      onClick={() => handleClick(_id)}
                      className="btn btn-outline btn-error "
                    >
                      DELETE
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

                <EditThreadFormModal title={title} content={content} threadId={_id} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ThreadStats;
