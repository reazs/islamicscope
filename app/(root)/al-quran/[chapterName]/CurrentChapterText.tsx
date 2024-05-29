import { Separator } from "@/components/ui/separator";
import { IAyahs } from "@/types";
import React from "react";
interface CurrentChapterTextProp {
  currentItems: IAyahs;
  indexOfFirstItem: number;
  currentItemsArabic: IAyahs | null;
}
const CurrentChapterText = ({
  currentItems,
  indexOfFirstItem,
  currentItemsArabic,
}: CurrentChapterTextProp) => {
  return (
    <>
      {currentItems.map((ayah, index) => (
        <div key={ayah.text + index} className=" py-3 ">
          <div className="flex items-center justify-between gap-1">
            <div className="w-full">
              {currentItemsArabic && (
                <p className="mt-10 mr-2 text-zinc-700  md:text-4xl text-2xl text-end .tajawal-light">
                  {currentItemsArabic[index].text}
                </p>
              )}
              <div className="flex  justify-between items-end  mt-5 ">
                <p className=" text-muted-foreground leading-7 mb-5 md:text-xl [&:not(:first-child)]:mt-6">
                  {ayah.text}
                </p>
                <div className="md:text-xl  text-[16px]  mb-2 text-emerald-400/60  mr-2 rounded-md  min-w-[30px] max-h-[30px] flex justify-center items-center">
                  {indexOfFirstItem + index + 1}.
                </div>
              </div>
            </div>
          </div>

          <Separator />
        </div>
      ))}
    </>
  );
};

export default CurrentChapterText;
