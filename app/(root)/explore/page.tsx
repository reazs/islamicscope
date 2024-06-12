"use client";
import ThreadCardTile from "@/components/CardTile/ThreadCardTile";
import Loading from "@/components/shared/Loading";
import { useThreads } from "@/hooks/useThreads";
import React from "react";
const Page = () => {
  const { data: threads, isLoading: isThreadLoading } = useThreads();
  if (isThreadLoading) {
    return <Loading />;
  }
  if (!threads) {
    return <Loading />;
  }
  return (
    <div>
      Explore
      {threads.map((thread) => (
        <ThreadCardTile {...thread} />
      ))}
    </div>
  );
};

export default Page;
