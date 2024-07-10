"use client";
import { useEffect, useState } from "react";
import { getUpdatedUserProfileImage } from "@/app/api/user/route";
import ThreadCardTile from "@/components/CardTile/ThreadCardTile";
import UserProfileCard from "@/components/CardTile/UserProfileCard";
import Loading from "@/components/shared/Loading";
import { useGetCurrentUserProfile, useThreads } from "@/hooks/useThreads";
import { UserProfile, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "./ProfileSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsTab from "./PostsTab";
import SavedTab from "./SavedTab";
import { useUserProfile } from "@/contexts/UserContext";

const Page = () => {
  const { user } = useUser();
  const [profileImageUpdated, setProfileImageUpdated] = useState(false);
  const { userProfile } = useUserProfile();
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
    return <ProfileSkeleton />;
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
      <Tabs defaultValue="posts" className="w-full mt-5">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostsTab
            threads={currentUserThreads}
            threadsLength={currentUserThreads.length}
          />
        </TabsContent>
        <TabsContent value="saved">
          <SavedTab hadithsId={userProfile?.hadiths as []} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
