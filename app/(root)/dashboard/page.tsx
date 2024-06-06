import { Settings, BookCopy, Book, Users, Search } from "lucide-react";
import prayerIcon from "@/assets/icons/islam-prayer-icon.png";
import DashboardLinkCard from "./DashboardLinkCardProps";
import Image from "next/image";
const page = async () => {
  const tools = [
    {
      label: "Al Quran",
      Icon: <Book />,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/al-quran",
    },
    {
      label: "Hadiths",
      Icon: <BookCopy />,
      href: "/hadiths",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
    {
      label: "Community",
      Icon: <Users />,
      href: "/community",
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
    },
    {
      label: "Explore",
      Icon: <Search />,
      href: "/explore",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Dua & Azkar",
      Icon: (
        <Image
          className="w-[28px] h-[28px]"
          src={prayerIcon}
          alt="prayer-icon"
        />
      ),
      href: "/dua",
      color: "text-green-700",
      bgColor: "bg-green-700/10",
    },
    {
      label: "Settings",
      Icon: <Settings />,
      href: "/settings",
    },
  ];

  // const loadData = async () => {
  //   const res = await fetch("/api/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "reazrizz",
  //       email: "reaz@gmail.com",
  //       title: "The First Game of Email",
  //       message: "This works prefectly. I think that we can do better.",
  //     }),
  //   });
  //   console.log(res);
  // };
  // await loadData();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="pb-10">
        <h2 className="scroll-m-20  text-center  text-3xl font-semibold tracking-tight first:mt-0">
          Quest for Divine Wisdom
        </h2>
        <p className=" text-zinc-500 max-w-md text-center">
          Seeking knowledge is an obligation upon every Muslim. Prophet Muhammad
          (ﷺ)
        </p>
      </div>
      {tools.map((menu, index) => (
        <DashboardLinkCard key={menu.href + index} {...menu} />
      ))}
    </div>
  );
};

export default page;
