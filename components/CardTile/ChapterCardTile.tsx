import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ISurah } from "@/types";
const ChapterCardTile = ({
  surah: { englishName, englishNameTranslation, revelationType },
  totalVerse,
  index,
}: {
  surah: ISurah;
  totalVerse: number;
  index: number;
}) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleClick = () => {
    setIsCollapse(!isCollapse);
  };
  const navigate = useRouter();
  const handleNavigate = () => {
    navigate.push("/al-quran/chapter=" + (index + 1));
    window.scrollTo(0, 0);
  };
  return (
    <div className=" p-3   w-full font-normal">
      <Collapsible className="w-full">
        <div className="flex items-center">
          <div className=" mr-3  p-2 text-center bg-primary text-primary-foreground  rounded-md min-w-[40px]">
            <p className=" ">{index + 1}</p>
          </div>
          <div className="  w-full flex justify-between">
            <p
              onClick={() => handleNavigate()}
              className="hover:cursor-pointer"
            >
              {englishName}
            </p>
            <CollapsibleTrigger className="">
              <p className="flex">
                {isCollapse ? (
                  <ChevronUp
                    onClick={() => handleClick()}
                    className="ml-2 text-zinc-400 hover:text-primary"
                  />
                ) : (
                  <ChevronDown
                    onClick={() => handleClick()}
                    className="ml-2 text-zinc-400 hover:text-primary"
                  />
                )}
              </p>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <div className="text-sm text-end mt-2 text-zinc-400 flex justify-between">
            <p className="">Name: {englishNameTranslation}</p>
            <p className="">Revelation: {revelationType}</p>
            <p>Verse: {totalVerse}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ChapterCardTile;
