"use client";
import Loading from "@/components/shared/Loading";
import { useUserProfile } from "@/contexts/UserContext";
import { useCreateThread } from "@/hooks/useThreads";
import { delay } from "@/lib/utils";
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

  const { mutateAsync: createThread, isPending: isLoadingCreate } =
    useCreateThread();
  const [error, setError] = useState<string | null>(null);

  if (!isSignedIn || !user) {
    return <Loading />;
  }
  const email = user.primaryEmailAddress?.emailAddress;

  const handleClick = async () => {
    setError(null);
    try {
      const newThread = await createThread({
        email: email as string,
        title: "Next js 13 to 14 huge update",
        content:
          "Switching to Next.js has significantly improved our website's performance and SEO. The hybrid capabilities of server-side rendering and static generation allow us to optimize content delivery for different pages effectively. Additionally, the seamless integration with React and rich plugin ecosystem make Next.js a versatile framework for any modern web project.",
      });
      if (newThread?.status === 200) {
        router.push("/profile");
      }
      //   const body = await newThread?.json();
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    }
  };
  if (userLoading) {
    return <Loading />; // Show a loading spinner or message while loading
  }
  return (
    <div>
      {isLoadingCreate ? (
        <Loading />
      ) : (
        <>
          <button className="btn btn-outline" onClick={handleClick}>
            Create Post
          </button>
          <p>Email: {email}</p>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Page;
