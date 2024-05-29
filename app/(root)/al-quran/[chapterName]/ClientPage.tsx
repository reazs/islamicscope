"use client";

import { IAyahs, ISurah } from "@/types";
import animalBookNight from "@/assets/images/moon-flower-desgin.png";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CurrentChapterText from "./CurrentChapterText";

interface ClientPageProps {
  chapterNumber: number;
  currentChapter: ISurah;
  currentArabicChapter: ISurah;
}

const ClientPage: React.FC<ClientPageProps> = ({
  chapterNumber,
  currentChapter,
  currentArabicChapter,
}) => {
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: IAyahs = currentChapter.ayahs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const currentItemsArabic: IAyahs = currentArabicChapter.ayahs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPage = Math.ceil(currentChapter.ayahs.length / itemsPerPage);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const nextChapterIndex = chapterNumber < 114 ? chapterNumber : null;
  const previousChapterIndex = chapterNumber > 1 ? chapterNumber - 2 : null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-zinc-600 font-josefin-sans font-bold">
        {currentChapter.englishName}
      </h1>
      <Image
        alt="logo-img"
        className="rounded-box max-h-[250px] max-w-[250px]"
        src={animalBookNight}
      />
      <div className="text-start max-w-screen-xl w-full">
        <CurrentChapterText
          currentItems={currentItems}
          indexOfFirstItem={indexOfFirstItem}
          currentItemsArabic={currentItemsArabic}
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
            className="hover:cursor-pointer"
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

        <div className="mt-10" />
        <div className="flex justify-between">
          {previousChapterIndex !== null && (
            <Link
              onClick={scrollToTop}
              href={`/al-quran/chapter=${previousChapterIndex + 1}`}
            >
              <Button variant="link">
                <ChevronLeft />
                {currentChapter.englishName}
              </Button>
            </Link>
          )}
          {nextChapterIndex !== null && (
            <Link
              onClick={scrollToTop}
              href={`/al-quran/chapter=${nextChapterIndex + 1}`}
            >
              <Button variant="link">
                {currentChapter.englishName}
                <ChevronRight />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
