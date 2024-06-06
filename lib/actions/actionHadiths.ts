"use server";

import {
  IhadithBookNames,
  hadithBookName,
} from "@/lib/models/hadith_book_name";
import {
  HadithChapterProp,
  hadithChapterNames,
} from "@/lib/models/hadith_chapter_names";
import { delay } from "@/lib/utils";
import { error } from "console";
import { HadithProp, hadiths } from "../models/hadiths";

const ITEMS_PER_PAGE = 15;

export const fetchHadithBookNames = async (): Promise<IhadithBookNames[]> => {
  try {
    const bookNames = hadithBookName;

    const books = bookNames;
    await delay(800);
    return books;
  } catch (e) {
    console.log("Failed to load hadiths book name", error);
    throw new Error("Failed to fetch hadith book names");
  }
};

interface fetchHadithChapterNamesParams {
  page?: number;
}
export const fetchHadithChapterNames = async ({
  page = 1,
}: fetchHadithChapterNamesParams): Promise<HadithChapterProp[]> => {
  try {
    const hadithChapters = hadithChapterNames;
    const indexOfLastItem = ITEMS_PER_PAGE * page;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const chapters = hadithChapters.slice(indexOfFirstItem, indexOfLastItem);
    await delay(800);
    return chapters;
  } catch (e) {
    console.log("Failed to load hadith chapter names", error);
    throw new Error("Failed to fetch hadith chapters name");
  }
};
interface fetchHadithsByChapterIdParams {
  id: string;
  page?: number;
}
interface fetchHadithsByChapterIdRespond {
  hadiths: HadithProp[];
  chapterTitle: string;
}
export const fetchHadithsByChapterId = async ({
  id,
  page = 1,
}: fetchHadithsByChapterIdParams): Promise<fetchHadithsByChapterIdRespond> => {
  try {
    const hadithsCollection = hadiths;
    const chapterId = parseInt(id);
    const newChapters = hadithsCollection.filter(
      (chapter) => chapter.Chapter_ID === chapterId
    );
    const indexOfLastItem = ITEMS_PER_PAGE * page;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const chapters = newChapters.slice(indexOfFirstItem, indexOfLastItem);
    const chapterTitle = hadithChapterNames.find(
      (chapter) => chapter.chapter_id === chapterId
    );

    await delay(800);
    return {
      hadiths: chapters,
      chapterTitle: chapterTitle?.chapter_title as string,
    };
  } catch (error) {
    console.log("failed to get hadiths by chapter id", error);
    throw new Error("failed to get hadiths by chapter id");
  }
};

interface fetchHadithByIdRespond {
  hadith: HadithProp;
  chapter: HadithChapterProp;
  book: IhadithBookNames;
}
export const fetchHadithById = async (
  hadithId: string
): Promise<fetchHadithByIdRespond | null> => {
  try {
    const id = parseInt(hadithId);
    const hadith = hadiths.find((chapter) => chapter.Hadith_ID === id);
    if (!hadith) return null;
    const chapter = hadithChapterNames.find(
      (chapter) => chapter.chapter_id === hadith.Chapter_ID
    ) as HadithChapterProp;
    const book = hadithBookName.find(
      (book) => book.Book_ID === hadith.Book_ID
    ) as IhadithBookNames;

    return {
      hadith: hadith,
      chapter: chapter,
      book: book,
    };
  } catch (error) {
    console.log("Failed to get hadith by id", error);
    throw new Error("Failed to get hadith by id");
  }
};

export const getNextHadithId = async ({
  hadithId,
  chapterId,
}: {
  hadithId: number;
  chapterId: number;
}): Promise<number | null> => {
  try {
    const chapterCollections = hadiths.filter(
      (hadith) => hadith.Chapter_ID === chapterId
    );
    const hadithIndex = chapterCollections.findIndex(
      (hadith) => hadith.Hadith_ID === hadithId
    );
    if (hadithIndex < chapterCollections.length - 1) {
      const nextHadithId = chapterCollections[hadithIndex + 1].Hadith_ID;
      return nextHadithId;
    }
    return null;
  } catch (error) {
    console.log("Failed to get next hadith by id", error);
    throw new Error("Failed to get next hadith by id");
  }
};

export const getPrevHadithId = async ({
  hadithId,
  chapterId,
}: {
  hadithId: number;
  chapterId: number;
}): Promise<number | null> => {
  try {
    const chapterCollections = hadiths.filter(
      (hadith) => hadith.Chapter_ID === chapterId
    );
    const hadithIndex = chapterCollections.findIndex(
      (hadith) => hadith.Hadith_ID === hadithId
    );
    if (hadithIndex > 0) {
      const nextHadithId = chapterCollections[hadithIndex - 1].Hadith_ID;
      return nextHadithId;
    }
    return null;
  } catch (error) {
    console.log("Failed to get next hadith by id", error);
    throw new Error("Failed to get next hadith by id");
  }
};

export const fetchHadithBySearch = async (searchQuery: string) => {
  try {
    const searchKey = searchQuery.toLowerCase();
    const searchHadiths = hadiths.filter(
      (hadith) =>
        hadith.En_Text.toLowerCase().includes(searchKey) ||
        hadith.En_Sanad.toLowerCase().includes(searchKey)
    );
    return searchHadiths;
  } catch (error) {
    console.log("Failed to get hadith by search keys", error);
    throw new Error("Failed to get hadith by search keys");
  }
};
