import { Button } from "@/components/ui/button";
import { SearchIcon, CommandIcon } from "lucide-react";
import { cn } from "@/utils";

export const CollapsedWidget = () => {
  return (
    <Button
      className={cn("text-xs bg-transparent hover:bg-white/20 text-white")}
      size="sm"
    >
      <SearchIcon size="1rem" />
      <p className="ml-1">Search</p>

      <div className="flex items-center bg-gray-800 p-0.5 ml-4 rounded text-xs">
        {/* TODO: Should be changed to CTRL on WINDOWS */}
        <CommandIcon size="0.75rem" />
        <p className="ml-0.5">K</p>
      </div>
    </Button>
  );
};
