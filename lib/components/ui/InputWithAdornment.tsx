import { cn } from "@/utils";
import { FC, InputHTMLAttributes, ReactNode } from "react";

export type ChatInputProps = {
  adornmentLeft?: ReactNode;
  adornmentRight?: ReactNode;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export const InputWithAdornment: FC<ChatInputProps> = ({
  adornmentLeft,
  adornmentRight,
  inputProps: { className: inputClassName, ...inputProps } = {},
  className,
  inputRef,
  ...props
}) => {
  return (
    <div className={cn("relative rounded-md", className)} {...props}>
      {adornmentLeft && (
        <div
          className={
            "absolute left-0 top-1/2 flex items-center justify-center pl-5 -translate-y-1/2"
          }
        >
          {adornmentLeft}
        </div>
      )}

      <input
        className={cn(
          `glime-scroll w-full flex-grow resize-none overflow-hidden overflow-y-auto
            rounded-md border border-input bg-transparent px-4 py-3 text-xl shadow-sm
            transition-colors file:border-0 file:bg-transparent file:text-sm
            file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed
            disabled:opacity-50`,
          inputClassName,
          { "pl-14": !!adornmentLeft, "pr-24": !!adornmentRight }
        )}
        ref={inputRef}
        {...inputProps}
      />
      {adornmentRight && (
        <div
          className={
            "absolute right-0 top-1/2 flex items-center justify-center -translate-y-1/2 pr-3"
          }
        >
          {adornmentRight}
        </div>
      )}
    </div>
  );
};
