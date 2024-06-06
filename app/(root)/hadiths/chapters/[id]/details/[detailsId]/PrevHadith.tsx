import { Button } from "@/components/ui/button";
import { getPrevHadithId } from "@/lib/actions/actionHadiths";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PrevHadithProp {
  chapterId: number;
  hadithId: number;
}
const PrevHadith = async ({ chapterId, hadithId }: PrevHadithProp) => {
  const nextHadithId = await getPrevHadithId({
    hadithId: hadithId,
    chapterId: chapterId,
  });
  if (!nextHadithId) return;

  return (
    <div>
      <Link
        href={"/hadiths/chapters/" + chapterId + "/details/" + nextHadithId}
      >
        <Button>
          <ChevronLeft />
        </Button>
      </Link>
    </div>
  );
};

export default PrevHadith;
