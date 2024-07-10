"use client";
import { useUserProfile } from "@/contexts/UserContext";
import { Bookmark, Heart, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useSaveHadith } from "@/hooks/useHadiths";
import { cn } from "@/lib/utils";
import { useGetCurrentUserProfile } from "@/hooks/useThreads";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
interface hadithStatsProp {
  hadithId: number;
  hadithChapterId: number;
}

const HadithStats = ({ hadithId, hadithChapterId }: hadithStatsProp) => {
  const { data: userProfile, isLoading: isUserLoading } =
    useGetCurrentUserProfile();
  const [isSaved, setIsSaved] = useState(false);
  const { mutateAsync: saveHadith, isPending: savingHadith } = useSaveHadith();
  const handleSaveClick = () => {
    console.log("button was click");
    saveHadith({ hadithId, userEmail: userProfile?.email as string });
  };

  useEffect(() => {
    if (userProfile?.hadiths?.includes(hadithId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [isSaved, saveHadith, handleSaveClick]);
  if (isUserLoading) {
    return (
      <div className="flex justify-end">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  return (
    <Dialog>
      <div className="w-full flex justify-end items-center space-x-2">
        {/* <span className="text-xl text-zinc-500">2</span> */}
        {/* <Heart className=" cursor-pointer hover:text-rose-400" /> */}
        <Bookmark
          onClick={handleSaveClick}
          fill={cn(isSaved ? "teal" : "white")}
          strokeWidth={isSaved ? "0" : "2"}
          className="cursor-pointer hover:text-teal-500"
        />
        <DialogTrigger asChild>
          <Share2 className="cursor-pointer hover:text-sky-500" />
        </DialogTrigger>
        <DialogContent>
          <Input readOnly value={"/hadiths/chapters/"+hadithChapterId+"details/"+hadithId} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default HadithStats;
