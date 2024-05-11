import { OramaCloud } from "@oramacloud/client/react";
import { FC, ReactNode, useEffect, useState } from "react";
import CollapsedWidget from "./CollapsedWidget";
import { ExpandedWidget } from "./ExpandedWidget";

export interface IWidgetProps {
  customButton?: ReactNode;
}

export const Widget: FC<IWidgetProps> = ({ customButton }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Listen to hotkey pressed
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        setIsExpanded((old) => !old);
      }

      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleOpen = () => {
    setIsExpanded(true);
  };

  const CollapsedButton = customButton ? customButton : <CollapsedWidget />;

  return (
    <>
      <OramaCloud
        endpoint="https://cloud.orama.run/v1/indexes/games-hvtrr7"
        apiKey="y82SEGK6ldP3rcNsPFzIiHWIVlMFVr5o"
      >
        <ExpandedWidget active={isExpanded} onClose={handleClose} />
      </OramaCloud>

      <div role="button" onClick={handleOpen}>
        {CollapsedButton}
      </div>
    </>
  );
};
