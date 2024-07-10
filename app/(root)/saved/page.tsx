"use client";
import Loading from "@/components/shared/Loading";
import { useUserProfile } from "@/contexts/UserContext";
import React from "react";
import { HadithProp, hadiths } from "@/lib/models/hadiths";
import HadithStats from "@/components/shared/HadithStats";
import Link from "next/link";
const page = () => {
  const { userProfile } = useUserProfile();
  if (!userProfile) {
    return <Loading />;
  }
  const hadithsId = userProfile.hadiths as [];
  const savedHadiths = hadiths.filter((hadith) =>
    hadithsId.includes(hadith.Hadith_ID)
  );
  return (
    <div>
      <div className="mt-10 grid lg:grid-cols-2 gap-2">
        {savedHadiths.map((hadith, index) => (
          <div
            key={hadith.Hadith_ID + index}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{hadith.En_Sanad}</h2>

              {/* hadiths stats */}
              <HadithStats hadithId={hadith.Hadith_ID} />
              <p className="line-clamp-3 my-5">{hadith.En_Text}</p>
              <div className="card-actions justify-end">
                <Link
                  href={
                    "/hadiths/chapters/" +
                    hadith.Chapter_ID +
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
    </div>
  );
};

export default page;
