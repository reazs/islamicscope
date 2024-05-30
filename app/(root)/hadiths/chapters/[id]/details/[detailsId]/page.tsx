import { fetchHadithById } from "@/lib/actions/actionHadiths";
import React, { useState } from "react";

const page = async ({ params }: { params: { detailsId: string } }) => {
  const data = await fetchHadithById(params.detailsId);
  if (!data) return;
  const { hadith, chapter, book } = data;

  return (
    <div className="  h-screen flex w-full justify-center items-center">
      <div className="max-w-screen-lg">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 md:text-3xl text-2xl font-semibold tracking-tight transition-colors first:mt-0 mb-10 ">
          {hadith.En_Sanad}
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{hadith.En_Text}</p>
        <div className="flex flex-col items-end mt-16 text-zinc-500 text-sm">
          <div className="text-start leading-7 border-t pt-5 max-w-[300px]">
            <p className="">
              <span className="  font-bold">Book Name:</span> {book.Book_Name}
            </p>
            <p>
              <span className="font-bold">Chapter Name:</span>{" "}
              {chapter.chapter_title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
