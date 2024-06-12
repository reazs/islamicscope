"use client";
import { useEffect, useState } from "react";
import { getUpdatedUserProfileImage } from "@/app/api/user/route";
import ThreadCardTile from "@/components/CardTile/ThreadCardTile";
import UserProfileCard from "@/components/CardTile/UserProfileCard";
import Loading from "@/components/shared/Loading";
import { useGetCurrentUserProfile, useThreads } from "@/hooks/useThreads";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const [profileImageUpdated, setProfileImageUpdated] = useState(false);
  const router = useRouter();
  const {
    data: userInfo,
    isLoading: isLoadingProf,
    isError: isErrorProf,
  } = useGetCurrentUserProfile();

  const {
    data: threads,
    isLoading: isThreadsLoading,
    isError: isErrorThreads,
  } = useThreads();

  useEffect(() => {
    if (
      userInfo?.imageUrl &&
      user?.imageUrl &&
      userInfo.imageUrl !== user.imageUrl
    ) {
      const updateProfileImage = async () => {
        try {
          console.log("Updating profile image...");
          await getUpdatedUserProfileImage();
          setProfileImageUpdated(true);
        } catch (error) {
          console.error("Failed to update profile image", error);
        }
      };
      updateProfileImage();
    }
  }, [userInfo, user]);

  if (profileImageUpdated) {
    window.location.reload();
  }

  if (isThreadsLoading || isLoadingProf) {
    return (
      <div className="mt-10">
        <UserProfileCard />
        <Loading />
      </div>
    );
  }

  if (isErrorThreads || isErrorProf) {
    return (
      <div className="mt-10">
        <UserProfileCard />
        <p>Failed to get threads</p>
      </div>
    );
  }

  if (!threads || !userInfo) {
    return <Loading />;
  }
  if (!isLoadingProf && !userInfo) {
    return router.push("/onboarding");
  }
  const currentUserThreads = threads.filter(
    (thread) => thread.user.email === userInfo.email
  );

  return (
    <div className="mt-10">
      <UserProfileCard />
      <h3 className="text-2xl text-zinc-400 font-bold font-josefin-sans my-5">
        Posts
      </h3>
      {currentUserThreads.length > 0 ? (
        currentUserThreads.map((thread) => (
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
