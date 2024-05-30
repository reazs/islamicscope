import React from "react";
import ClientPage from "./ClientPage";
import { fetchHadithChapterNames } from "@/lib/actions/actionHadiths";
const Page = async () => {
  const chapterNames = await fetchHadithChapterNames({ page: 1 });

  if (!chapterNames) {
    return;
  }
  return (
    <div>
      <ClientPage hadithBookNames={chapterNames} />
    </div>
  );
};

export default Page;
