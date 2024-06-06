"use client";
import ThreadCardTile from "@/components/CardTile/ThreadCardTile";
import UserProfileCard from "@/components/CardTile/UserProfileCard";
import Loading from "@/components/shared/Loading";
import { useUserProfile } from "@/contexts/UserContext";
import { useThreads } from "@/hooks/useThreads";
import { Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return <Loading />;
  }
  const { data: threads, isLoading, isError, error } = useThreads();
  if (isLoading) {
    return (
      <div className="mt-10">
        <UserProfileCard />
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className="mt-10">
        <UserProfileCard />
        <p>Failed to get threads</p>
      </div>
    );
  }
  if (!threads) {
    return <Loading />;
  }
  const currentUserThreads = threads.filter(
    (thread) => thread.user.email === userProfile.email
  );

  return (
    <div className="mt-10">
      <UserProfileCard />
      <h3 className="text-2xl text-zinc-400 font-bold font-josefin-sans my-5">
        Posts
      </h3>
      {currentUserThreads.length > 0 ? (
        currentUserThreads.map((thread, index) => (
          <ThreadCardTile key={thread._id} {...thread} />
        ))
      ) : (
        <div className="h-[400px] flex justify-center items-center">
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
    </div>
  );
};

export default Page;
