"use client";
import OnboardingForm from "@/components/forms/OnboardingForm";
import Loading from "@/components/shared/Loading";
import MediumHeading from "@/components/shared/MediumHeading";
import { useUserProfile } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { userProfile, loading: profileLoading } = useUserProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (profileLoading) return; // Wait until profile is done loading

      if (userProfile) {
        router.push("/profile");
      } else {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, [userProfile, profileLoading, router]);

  if (loading) {
    return <Loading />;
  }
  if (profileLoading) {
    return <Loading />;
  }

  return (
    <>
      (
      <div>
        <MediumHeading>Update your profile</MediumHeading>
        <div className="max-w-screen-sm lg:mx-auto mx-5 mt-20">
          <OnboardingForm />
        </div>
      </div>
      )
    </>
  );
};

export default Page;
