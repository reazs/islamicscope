"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import Loading from "@/components/shared/Loading";
import MediumHeading from "@/components/shared/MediumHeading";
import { useUserProfile } from "@/contexts/UserContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { isSignedIn, user } = useUser();
  const { userProfile, loading: profileLoading } = useUserProfile();
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!profileLoading && !userProfile) {
        router.push("/onboarding");
      } else {
        setUserLoading(false);
      }
    };

    checkUserProfile();
  }, [userProfile, router]);

  if (!isSignedIn || !user) {
    return <Loading />;
  }

  if (userLoading) {
    return <Loading />; // Show a loading spinner or message while loading
  }

  return (
    <div className="flex h-[90vh] items-center justify-center">
      <>
        {/* <button className="btn btn-outline" onClick={handleClick}>
            Create Post
          </button>
          <p>Email: {email}</p>
          {error && <p className="text-red-500">{error}</p>} */}
      </>

      <div className=" max-w-screen-lg mx-auto  ">
        <MediumHeading>Create Post</MediumHeading>
        <p className="text-center text-zinc-400">
          Express yourself and inspire others with your unique perspective!
        </p>

        <CreatePostForm />
      </div>
    </div>
  );
};

export default Page;
