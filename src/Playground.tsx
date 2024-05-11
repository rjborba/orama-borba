import { FC, useState } from "react";
import { Widget } from "../lib/Widget";
import { SearchIcon } from "lucide-react";

const CustomButton: FC = () => {
  return (
    <button className="bg-gray-800 rounded-full p-2 text-white hover:scale-105 transition-transform">
      <SearchIcon size="1rem" />
    </button>
  );
};

export const Playground: FC = () => {
  const [buttonType, setButtonType] = useState<"default" | "custom">("default");

  return (
    <div className="p-4 ">
      <div className="">
        <button
          className="flex items-center gap-1"
          onClick={() => {
            setButtonType("default");
          }}
        >
          <input
            type="radio"
            value="default"
            name="default"
            checked={buttonType === "default"}
          />
          Default Button
        </button>
        <button
          className="flex items-center gap-1 mt-2"
          onClick={() => {
            setButtonType("custom");
          }}
        >
          <input
            type="radio"
            value="custom"
            name="custom"
            checked={buttonType === "custom"}
          />
          Custom Button
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between h-14 bg-black  px-4">
          <p className="text-white">Header</p>
          {buttonType === "default" ? (
            <Widget />
          ) : (
            <Widget customButton={<CustomButton />} />
          )}
        </div>
      </div>
    </div>
  );
};
