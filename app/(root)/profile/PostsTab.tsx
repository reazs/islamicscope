import ThreadCardTile from "@/components/CardTile/ThreadCardTile";
import { IThread } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const PostsTab = ({
  threadsLength,
  threads,
}: {
  threadsLength: number;
  threads: IThread[];
}) => {
  return (
    <>
      {threadsLength > 0 ? (
        threads.map((thread) => <ThreadCardTile key={thread._id} {...thread} />)
      ) : (
        <div className="h-[400px] w-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">
              Looks like you haven't posted anything yet. Why not share your
              thoughts?
            </p>
            <Link className="flex btn btn-outline mt-10" href={"/create-post"}>
              <Plus /> <p> Create Post</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsTab;
