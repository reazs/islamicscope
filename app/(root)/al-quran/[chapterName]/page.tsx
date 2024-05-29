import { alQuranArabic, quranChapters } from "@/constant";
import ClientPage from "./ClientPage";
import { IAyahs, ISurah } from "@/types";
import { fetchAlQuranEnAr } from "./actions";

const fetchChapterData = async (chapterNumber: number) => {
  const currentChapter: ISurah = quranChapters[chapterNumber - 1] as ISurah;
  const currentArabicChapter: ISurah = alQuranArabic[
    chapterNumber - 1
  ] as ISurah;
  return { currentChapter, currentArabicChapter };
};
interface PageProps {
  params: {
    chapterName: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const chapter = params.chapterName.split("%3D")[1];
  const chapterNumber = parseInt(chapter, 10);

  const {
    prevChapterName,
    chapterAyahsArabic,
    chapterAyahsEnglish,
    nextChapterName,
    totalAyahs,
    currentChapterName,
  } = await fetchAlQuranEnAr({ page: 1, chapterNumber });

  return (
    <ClientPage
      chapterNumber={chapterNumber}
      currentChapter={chapterAyahsEnglish}
      currentArabicChapter={chapterAyahsArabic}
      prevChapterName={prevChapterName}
      nextChapterName={nextChapterName}
      totalAyahsLength={totalAyahs}
      currentChapterName={currentChapterName}
    />
  );
};

export default Page;
