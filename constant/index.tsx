import ALQURAN from "@/lib/models/en_edition";
import { ISurahs } from "@/types";
import { Book, BookCopy, Home, LayoutDashboard, Search } from "lucide-react";
import { AlQuranArabic } from "@/lib/models/al_quran_editions/ar_edition";
export const menuItemsSidebar = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    herf: "/dashboard",
  },
  {
    label: "Al Quran",
    icon: <Book />,
    herf: "/al-quran",
    subMenu: true,
  },
  {
    label: "Hadiths",
    icon: <BookCopy />,
    herf: "/hadiths",
  },
  {
    label: "Explore",
    icon: <Search />,
    herf: "/explore",
  },
];

const alQuranArabicData = AlQuranArabic.data as any;
const data = ALQURAN.data as any;
export const quranChapters: ISurahs = data.surahs;
export const alQuranArabic: ISurahs = alQuranArabicData.surahs;
