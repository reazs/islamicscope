import HadithStats from '@/components/shared/HadithStats';
import { hadiths } from '@/lib/models/hadiths';
import Link from 'next/link';
import React from 'react'

const SavedTab = ({ hadithsId }: { hadithsId: [] }) => {
      const savedHadiths = hadiths.filter((hadith) =>
        hadithsId.includes(hadith.Hadith_ID)
      );
  return (
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
  );
}

export default SavedTab