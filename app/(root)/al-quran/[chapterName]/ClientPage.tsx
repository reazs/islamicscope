"use client";

import { IAyahs, ISurah } from "@/types";
import animalBookNight from "@/assets/images/moon-flower-desgin.png";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CurrentChapterText from "./CurrentChapterText";
import { useInView } from "react-intersection-observer";
import { fetchAlQuranEnAr } from "./actions";

interface ClientPageProps {
  chapterNumber: number;
  currentChapter: IAyahs;
  currentArabicChapter: IAyahs;
  prevChapterName: string;
  nextChapterName: string;
  totalAyahsLength: number;
  currentChapterName: string;
}

const ClientPage: React.FC<ClientPageProps> = ({
  chapterNumber,
  currentChapter,
  currentArabicChapter,
  prevChapterName,
  nextChapterName,
  totalAyahsLength,
  currentChapterName,
}) => {
  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // useInView hook to detect when the element is in view
  const { ref, inView } = useInView();

  // State to manage current page, loading status, and more ayahs availability
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // State to manage loaded English and Arabic ayahs
  const [englishAyahs, setEnglishAyahs] = useState(currentChapter);
  const [arabicAyahs, setArabicAyahs] = useState(currentArabicChapter);

  // Determine the next and previous chapter indices
  const nextChapterIndex = chapterNumber < 114 ? chapterNumber : null;
  const previousChapterIndex = chapterNumber > 1 ? chapterNumber - 2 : null;

  // Function to load more ayahs
  const loadMoreAyahs = async () => {
    if (loading || !hasMore) return; // Prevent multiple calls while loading or if no more ayahs to load
    setLoading(true);

    const nextPage = page + 1; // Calculate the next page number

    // Fetch English and Arabic ayahs for the next page
    const { chapterAyahsArabic, chapterAyahsEnglish } = await fetchAlQuranEnAr({
      page: nextPage,
      chapterNumber: chapterNumber,
    });

    // Check if there are no more ayahs to load
    if (chapterAyahsEnglish.length === 0 || chapterAyahsArabic.length === 0) {
      setHasMore(false); // Set hasMore to false to prevent further calls
      setLoading(false);
      return;
    }

    // Update the state with the new ayahs
    setPage(nextPage);
    setEnglishAyahs((prev) => [...prev, ...chapterAyahsEnglish]);
    setArabicAyahs((prev) => [...prev, ...chapterAyahsArabic]);

    setLoading(false);
  };

  // useEffect hook to call loadMoreAyahs when the ref element is in view and there are more ayahs to load
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreAyahs();
    }
  }, [inView, hasMore]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-zinc-600 font-josefin-sans font-bold">
        {currentChapterName}
      </h1>
      <Image
        alt="logo-img"
        className="rounded-box max-h-[250px] max-w-[250px]"
        src={animalBookNight}
      />
      <div className="text-start max-w-screen-xl w-full">
        <CurrentChapterText
          currentItems={englishAyahs}
          indexOfFirstItem={0}
          currentItemsArabic={arabicAyahs}
        />
        {/* Display loading spinner if there are more ayahs to load */}
        {hasMore && (
          <div className="flex justify-center">
            <span ref={ref} className="loading loading-ring loading-lg"></span>
          </div>
        )}

        <div className="mt-10" />
        <div className="flex justify-between">
          {/* Link to the previous chapter */}
          {previousChapterIndex !== null ? (
            <Link
              onClick={scrollToTop}
              href={`/al-quran/chapter=${previousChapterIndex + 1}`}
            >
              <Button variant="link">
                <ChevronLeft />
                {prevChapterName}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {/* Link to the next chapter */}
          {nextChapterIndex !== null && (
            <Link
              onClick={scrollToTop}
              href={`/al-quran/chapter=${nextChapterIndex + 1}`}
            >
              <Button variant="link">
                {nextChapterName}
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
