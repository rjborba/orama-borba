import { cn } from "@/utils";
import { FC, memo } from "react";
import { motion } from "framer-motion";

export interface IResultListProps {
  // FIX-ME: Seems Orama lib does not exports results type. I'm setting just the basic here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: { hits: any[] } | null;
  selectedIndex: number;
}

// Pure to prevent rerender upon input change
export const ResultList: FC<IResultListProps> = memo(
  ({ results, selectedIndex }) => (
    <motion.div
      layout
      className="overflow-auto pt-1 pb-1 better-scroll px-2 mt-1"
    >
      {results?.hits.map((hit, hitIndex) => {
        return (
          <a
            // TODO: Would navigate to desired page
            href="#"
            onClick={() => {
              alert(`TODO: Navigate to ${hit.document.title}`);
            }}
            key={hit.id}
            className={cn(
              "py-3 block w-full text-left  transition-colors px-2 rounded",
              {
                "outline outline-neutral-500 scale-[1.01] transition-transform":
                  hitIndex === selectedIndex,
              },
              "hover:bg-neutral-900"
            )}
          >
            <div className="flex items-center">
              <p className="text-lg">{hit.document.title}</p>
              <div className="ml-2 flex gap-1">
                {hit.document.genres.map((genre: string) => {
                  return (
                    <div className="text-[0.7rem] pt-0.5 px-1 bg-slate-800 text-white/80 rounded-xl">
                      {genre}
                    </div>
                  );
                })}
              </div>
            </div>
            <p
              className="text-xs text-white/70 mt-0.5"
              style={{
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {hit.document.description}
            </p>
          </a>
        );
      })}
    </motion.div>
  )
);
