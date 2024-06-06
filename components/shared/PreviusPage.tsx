"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PreviusPage = ({ chapterId }: { chapterId: number }) => {
  const router = useRouter();
  return (
    <button
      className="btn btn-outline"
      onClick={() => router.push("/hadiths/chapters/" + chapterId)}
    >
      <ChevronLeft />
    </button>
  );
};

export default PreviusPage;
