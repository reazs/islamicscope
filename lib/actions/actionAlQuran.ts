"use server";

import { alQuranArabic, quranChapters } from "@/constant";
import { delay } from "@/lib/utils";
import { IAyahs } from "@/types";

// Helper function to add delay
const ITEMS_PER_PAGE = 30;

interface FetchAlQuranEnArParams {
  page?: number;
  chapterNumber: number;
}

interface FetchAlQuranEnArResponse {
  prevChapterName: string;
  chapterAyahsEnglish: IAyahs;
  chapterAyahsArabic: IAyahs;
  nextChapterName: string;
  totalAyahs: number;
  currentChapterName: string;
}

// Fetches English and Arabic ayahs of a specific chapter and page
export const fetchAlQuranEnAr = async ({
  page = 1,
  chapterNumber,
}: FetchAlQuranEnArParams): Promise<FetchAlQuranEnArResponse> => {
  try {
    // Calculate the indices of items to fetch based on the page number
    const indexOfLastItem = ITEMS_PER_PAGE * page;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    // Fetch the ayahs for the specified chapter and page in English
    const chapterAyahsEnglish: IAyahs = quranChapters[
      chapterNumber - 1
    ].ayahs.slice(indexOfFirstItem, indexOfLastItem) as any;

    // Fetch the ayahs for the specified chapter and page in Arabic
    const chapterAyahsArabic: IAyahs = alQuranArabic[
      chapterNumber - 1
    ].ayahs.slice(indexOfFirstItem, indexOfLastItem) as any;

    // Determine the previous chapter name if applicable
    let prevChapterName = "";
    if (chapterNumber > 1 && chapterNumber !== 1) {
      prevChapterName = alQuranArabic[chapterNumber - 2].englishName;
    }

    // Get the current chapter name
    const currentChapterName = alQuranArabic[chapterNumber - 1].englishName;

    // Determine the next chapter number
    let nextChapter = chapterNumber;
    if (chapterNumber >= 1 && chapterNumber < 114) {
      nextChapter = chapterNumber + 1;
    } else {
      nextChapter = 1;
    }

    // Get the total number of ayahs in the current chapter
    const totalAyahs = alQuranArabic[chapterNumber - 1].ayahs.length;

    // Get the next chapter name
    const nextChapterName = alQuranArabic[nextChapter - 1].englishName;

    // Delay for 800 milliseconds to simulate a network delay
    await delay(800);

    // Return the fetched data
    return {
      prevChapterName,
      chapterAyahsEnglish,
      chapterAyahsArabic,
      nextChapterName,
      totalAyahs,
      currentChapterName,
    };
  } catch (error) {
    // Log the error and rethrow it to be handled by the caller
    console.error("Error fetching Quran data:", error);
    throw new Error("Failed to fetch Quran data.");
  }
};
