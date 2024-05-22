"use client";

import { IAyahs, ISurah } from "@/types";
import chastleMoonlight from "@/assets/images/moon-flower-desgin.png";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CurrentChapterText from "./CurrentChapterText";
import { quranChapters } from "@/constant";
const Page = () => {
  const id = usePathname();
  const chapterNumber = parseInt(id.split("=")[1]);

  const quranEn = quranChapters;
  const currentChapter: ISurah = quranEn[chapterNumber - 1] as ISurah;
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: IAyahs = currentChapter.ayahs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPage = Math.ceil(currentChapter.ayahs.length / itemsPerPage);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  // next chapter
  const currentChapterIndex = chapterNumber - 1;
  let nextChapter, previousChapter;
  if (currentChapterIndex < 114) {
    nextChapter = currentChapterIndex + 1;
  }
  if (currentChapterIndex > 0) {
    previousChapter = currentChapterIndex - 1;
  }

  const nextIndex: number = nextChapter as number;
  const previousIndex: number = previousChapter as number;
  return (
    <div className="">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className=" font-bold text-3xl text-zinc-400 ">
          {currentChapter.englishName}
        </h1>
        <Image
          alt="logo-img"
          className=" mask  max-h-[250px] max-w-[250px]"
          src={chastleMoonlight}
        />
        <div className="text-start max-w-screen-xl w-full">
          <CurrentChapterText
            currentItems={currentItems}
            indexOfFirstItem={indexOfFirstItem}
          />
          <div className="flex items-center justify-center mt-5 gap-3">
            <ChevronLeft
              onClick={() => {
                if (currentPage <= 1) {
                  setCurrentPage(totalPage);
                } else {
                  setCurrentPage(currentPage - 1);
                }
                scrollToTop();
              }}
              className=" hover:cursor-pointer"
            />
            {currentPage}/{totalPage}
            <ChevronRight
              onClick={() => {
                if (currentPage >= totalPage) {
                  setCurrentPage(1);
                } else {
                  setCurrentPage(currentPage + 1);
                }
                scrollToTop();
              }}
              className="hover:cursor-pointer"
            />
          </div>

          {/* next and prev chapter */}
          <div className="mt-10" />
          <div className="flex justify-between">
            <div>
              {currentChapterIndex >= 2 && (
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  href={"/al-quran/chapter=" + previousIndex}
                >
                  <Button variant={"link"}>
                    <ChevronLeft />
                    {quranEn[previousIndex].englishName}
                  </Button>
                </Link>
              )}
            </div>
            <div>
              {/* href={"/al-quran/" + englishName} */}
              {nextIndex < quranEn.length && (
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  href={"/al-quran/chapter=" + (nextIndex + 1)}
                >
                  <Button variant={"link"}>
                    {quranEn[nextIndex].englishName}
                    <ChevronRight />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
