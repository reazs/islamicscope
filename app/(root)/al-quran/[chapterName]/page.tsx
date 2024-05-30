import ClientPage from "./ClientPage";
import { fetchAlQuranEnAr } from "@/lib/actions/actionAlQuran";

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
