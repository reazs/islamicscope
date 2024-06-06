"use client";
import MediumHeading from "@/components/shared/MediumHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fetchHadithBySearch,
  fetchHadithsByChapterId,
} from "@/lib/actions/actionHadiths";
import { HadithProp } from "@/lib/models/hadiths";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ClientPageProps {
  chapterId: string;
  hadiths: HadithProp[];
  chapterTitle: string;
}

const ClientPage = ({ chapterId, hadiths, chapterTitle }: ClientPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [hadithsStore, setHadithsStore] = useState<HadithProp[]>(hadiths);
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedHadiths, setSearchedHadiths] = useState<HadithProp[] | null>(
    null
  );

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const hadiths = await fetchHadithBySearch(query);
      setSearchedHadiths(hadiths);
    } else {
      setSearchedHadiths(null);
    }
  };

  const loadMore = () => {
    try {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      const nextPage = page + 1;
      fetchHadithsByChapterId({
        id: chapterId,
        page: nextPage,
      }).then((data) => {
        const { hadiths: hadithsCollection } = data;
        if (hadithsCollection.length === 0) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }

        setHadithsStore((prev) => [...prev, ...hadithsCollection]);
        setPage(nextPage);
        setIsLoading(false);
      });
    } catch (e) {
      console.log("Failed to load more hadiths", e);
      setIsLoading(false);
      throw new Error("Failed to load more hadiths");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore]);

  return (
    <div>
      <MediumHeading>{chapterTitle}</MediumHeading>
      <div className="mt-10 flex justify-end">
        <div className="flex space-x-2">
          <Input onChange={handleSearchChange} placeholder="search hadiths" />
        </div>
      </div>
      <div className="mt-10 grid lg:grid-cols-2 gap-2">
        {(searchedHadiths || hadithsStore).map((hadith, index) => (
          <div
            key={hadith.Hadith_ID + index}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{hadith.En_Sanad}</h2>
              <p className="line-clamp-3 my-5">{hadith.En_Text}</p>
              <div className="card-actions justify-end">
                <Link
                  href={
                    "/hadiths/chapters/" +
                    chapterId +
                    "/details/" +
                    hadith.Hadith_ID
                  }
                >
                  <button className="btn btn-outline">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && !searchedHadiths && (
        <div className="flex justify-center my-10">
          <span ref={ref} className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default ClientPage;
