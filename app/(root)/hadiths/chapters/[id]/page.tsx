import { fetchHadithsByChapterId } from "@/lib/actions/actionHadiths";
import ClientPage from "./ClientPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { hadiths, chapterTitle } = await fetchHadithsByChapterId({
    id: params.id,
  });

  return (
    <div>
      <ClientPage
        chapterId={params.id}
        chapterTitle={chapterTitle}
        hadiths={hadiths}
      />
    </div>
  );
}
