"use client";
import quranEnlish from "@/lib/models/en_edition";
import { ISurah, ISurahs } from "@/types";
import alquranIllustration from "@/assets/images/alQuran-illustration.png";
import ChapterCardTile from "@/components/CardTile/ChapterCardTile";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import MediumHeading from "@/components/shared/MediumHeading";
const Page = () => {
  const quranEn = quranEnlish.data as any;
  const quranChapters: ISurahs = quranEn.surahs as any;
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: ISurahs = quranChapters.slice(
    indexOfFirstItem,
    indexOfLastItem
  ) as any;
  const totalPage = Math.ceil(quranChapters.length / itemsPerPage);
  return (
    <div className=" md:max-w-screen-md w-full mx-auto ">
      <MediumHeading>Al Quran</MediumHeading>
      <Image
        alt="illustration-image"
        className="mx-auto h-[350px] w-[350px]  md:mt-5"
        src={alquranIllustration}
      />
      <div className="grid md:grid-cols-2 p-2 ">
        {currentItems.map((chapter, index) => (
          <div className=" border-b">
            <ChapterCardTile
              index={indexOfFirstItem + index}
              surah={chapter}
              totalVerse={chapter.ayahs.length}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-5 gap-3">
        <ChevronLeft
          onClick={() => {
            if (currentPage <= 1) {
              setCurrentPage(totalPage);
            } else {
              setCurrentPage(currentPage - 1);
            }
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
          }}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Page;
