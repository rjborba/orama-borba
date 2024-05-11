import { InputWithAdornment } from "@/components/ui/InputWithAdornment";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { useSearch } from "@oramacloud/client/react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, CornerDownLeft, SearchIcon } from "lucide-react";
import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ResultList } from "./ResultList";

export interface ICollapsedWidgetProps {
  active: boolean;
  onClose: () => unknown;
}
export const ExpandedWidget: FC<ICollapsedWidgetProps> = ({
  active,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const expandedModalRef = useRef<HTMLDivElement>(null);

  const { results } = useSearch({
    term: inputValue,
    limit: 5,
  });

  // Force input autofocus after display change from none to block
  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [active, inputRef]);

  useLayoutEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    onClose();
    e.stopPropagation();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results?.hits) {
      return;
    }

    if (e.key === "ArrowDown") {
      if (selectedIndex + 1 < results.hits.length) {
        setSelectedIndex((old) => old + 1);
      } else if (results.hits.length > 0) {
        setSelectedIndex(0);
      }
      e.stopPropagation();
      e.preventDefault();
    }

    if (e.key === "ArrowUp") {
      if (selectedIndex - 1 >= 0) {
        setSelectedIndex((old) => old - 1);
      } else if (results.hits.length > 0) {
        setSelectedIndex(results.hits.length - 1);
      }
      e.stopPropagation();
      e.preventDefault();
    }

    if (e.key === "Enter") {
      if (selectedIndex > -1) {
        alert(
          `TODO: Navigate to ${results.hits[selectedIndex].document.title}`
        );
      }
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    // {/* Backdrop */}
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      ref={expandedModalRef}
      className={cn(
        "bg-black/60 fixed flex flex-col inset-0 z-[999999] overflow-hidden justify-start items-middle",
        {
          hidden: !active,
        }
      )}
      onClick={handleOutsideClick}
    >
      {/* MODAL */}
      <motion.div
        initial={{
          y: -200,
        }}
        animate={active ? { y: 0 } : {}}
        className="flex flex-col bg-black p-4 mt-12 mb-8 text-white overflow-hidden w-full max-w-[820px] mx-auto rounded-lg border border-white/50"
        onClick={handleModalClick}
      >
        <InputWithAdornment
          inputRef={inputRef}
          inputProps={{
            value: inputValue,
            onChange: handleInputChange,
            onKeyDown: handleInputKeyDown,
            placeholder: "What are you looking for?",
          }}
          adornmentLeft={<SearchIcon />}
          adornmentRight={
            <motion.div
              initial={{ opacity: 0 }}
              animate={inputValue.length ? { opacity: 1 } : {}}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInputValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
                className={cn({ hidden: !inputValue.length })}
              >
                Clear
              </Button>
            </motion.div>
          }
        />
        {/* RESULT AREA */}
        <div className="overflow-auto pt-4 pb-1 better-scroll px-1 mt-1">
          {inputValue.length ? (
            <ResultList results={results} selectedIndex={selectedIndex} />
          ) : null}

          {/* {!inputValue.length && (
            <div className="flex justify-center my-12">How can I help?</div>
          )} */}

          {inputValue.length && !results?.hits?.length ? (
            <div className="flex justify-center my-12">
              No results. Try using different terms
            </div>
          ) : null}
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <div className="text-sm flex items-center gap-0.5">
            <div className="flex justify-center items-center bg-gray-700 h-4 w-4 rounded">
              <ArrowDown size="0.75rem" />
            </div>
            <div className="flex justify-center items-center bg-gray-700 h-4 w-4 rounded">
              <ArrowUp size="0.75rem" />
            </div>
            <p className="ml-1">Navigate</p>
          </div>

          <div className="text-sm flex items-center gap-0.5">
            <div className="flex justify-center items-center bg-gray-700 h-4 w-4 rounded">
              <CornerDownLeft size="0.75rem" />
            </div>
            <p className="ml-1">Select</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
