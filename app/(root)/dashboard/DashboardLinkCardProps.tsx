import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const DashboardLinkCard = ({ Icon, label, href, bgColor, color }: any) => {
  return (
    <Link
      className="flex flex-row justify-between items-center mb-5 group  border cursor-pointer hover:bg-primary-content hover:text-primary-foreground  border-primary rounded-sm p-3  w-full md:max-w-screen-md "
      href={href}
    >
      <div className=" flex items-center gap-2">
        <div
          className={cn(
            bgColor,
            "p-1   group-hover:bg-secondary group-hover:text-primary bg-opacity-[0.5] rounded-md"
          )}
        >
          {Icon}
        </div>
        <p>{label}</p>
      </div>
      <ChevronRight />
    </Link>
  );
};

export default DashboardLinkCard;
