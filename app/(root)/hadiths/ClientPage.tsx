"use client";
import MediumHeading from "@/components/shared/MediumHeading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import hadithCoverImage from "@/assets/images/animal-and-book-night.png";
import { HadithChapterProp } from "@/lib/models/hadith_chapter_names";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { fetchHadithChapterNames } from "@/lib/actions/actionHadiths";

interface ClientPageProp {
  hadithBookNames: HadithChapterProp[];
}

const ClientPage: React.FC<ClientPageProp> = ({ hadithBookNames }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [chapters, setChapters] = useState(hadithBookNames);
  const { ref, inView } = useInView();

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    fetchHadithChapterNames({ page: nextPage })
      .then((newChapters) => {
        if (newChapters.length === 0) {
          setHasMore(false);
        } else {
          setPage(nextPage);
          setChapters((prev) => [...prev, ...newChapters]);
        }
      })
      .catch((error) => {
        console.error("Error fetching more chapters:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore]);

  return (
    <div className="">
      <div className="flex justify-center">
        <MediumHeading>Hadith Chapters</MediumHeading>
      </div>
      <Image
        src={hadithCoverImage}
        width={350}
        height={350}
        alt="hadith-logo-img"
        className="rounded-full mx-auto"
      />
      {chapters.map((chapter, index) => (
        <Link
          key={chapter.chapter_id + index}
          href={"/hadiths/chapters/" + chapter.chapter_id}
        >
          <div className="p-4 max-w-screen-lg mx-auto border border-primary my-2 rounded-md cursor-pointer group hover:bg-primary">
            {chapter.chapter_title === "" ? (
              <p className="group-hover:text-primary-foreground">
                {index + 1}. Chapter Title Missing
              </p>
            ) : (
              <p className="group-hover:text-primary-foreground">
                {index + 1}. {chapter.chapter_title}
              </p>
            )}
          </div>
        </Link>
      ))}
      {/* Display loading spinner if there are more ayahs to load */}
      {hasMore && (
        <div className="flex justify-center">
          <span ref={ref} className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default ClientPage;
