import Image from "next/image";
import { IComment, IThread } from "@/types";
import { formatTimestamp } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link";
import { Button } from "../ui/button";

import ThreadCommentInput from "./ThreadCommentInput";
import ThreadStats from "./ThreadStats";
const ThreadCardTile = ({
  title,
  content,
  user,
  _id,
  createdAt,
  comments,
  likes
}: IThread) => {
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
                    <Link href={"/post/" + _id}>View Details</Link>
                  </Button>
                </div>

                {/* threads stats */}
                <ThreadStats
                  title={title}
                  content={content}
                  _id={_id}
                  user={user}
                  comments={comments as IComment[]}
                  likes={likes}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{formatTimestamp(createdAt)}</p>
      </div>

      <CollapsibleContent className="">
        {/* */}
        <div className="max-w-screen-lg shadow-lg p-5 rounded-md bg-white mx-auto my-5 space-y-5">
          <ThreadCommentInput comments={comments as IComment[]} _id={_id} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ThreadCardTile;
