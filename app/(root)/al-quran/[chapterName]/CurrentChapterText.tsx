import { Separator } from "@/components/ui/separator";
import { IAyahs, ISurah } from "@/types";
import React from "react";
interface CurrentChapterTextProp {
  currentItems: IAyahs;
  indexOfFirstItem: number;
}
const CurrentChapterText = ({
  currentItems,
  indexOfFirstItem,
}: CurrentChapterTextProp) => {
  return (
    <>
      {currentItems.map((ayah, index) => (
        <div key={ayah.text + index} className=" py-3 ">
          <div className="flex items-center justify-between gap-1">
            <div className="w-full">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {ayah.text}
              </p>
            </div>
            <div className="bg-base-300 mb-2 text-muted-foreground text-[12px] mr-2 rounded-md  w-[30px] h-[30px] flex justify-center items-center">
              {indexOfFirstItem + index + 1}
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </>
  );
};

export default CurrentChapterText;
