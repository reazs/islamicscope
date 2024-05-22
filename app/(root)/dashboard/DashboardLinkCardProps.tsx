import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const DashboardLinkCard = ({ Icon, label, herf, bgColor, color }: any) => {
  return (
    <div className="flex mb-5 group  border cursor-pointer hover:bg-primary-content hover:text-primary-foreground  border-primary rounded-sm p-3 flex-row justify-between items-center w-full md:max-w-screen-md">
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
    </div>
  );
};

export default DashboardLinkCard;
