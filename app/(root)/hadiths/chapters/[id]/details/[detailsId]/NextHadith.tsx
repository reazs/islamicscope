import { Button } from "@/components/ui/button";
import { getNextHadithId } from "@/lib/actions/actionHadiths";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NextHadithProp {
  chapterId: number;
  hadithId: number;
}
const NextHadith = async ({ chapterId, hadithId }: NextHadithProp) => {
  const nextHadithId = await getNextHadithId({
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
           <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default NextHadith;
