/** React 관련 */
import React, { useCallback, useMemo } from "react";

/** Component */
import FadedImage from "@Components/FadedImage";

/** Animation */
import { motion } from "framer-motion";
const scaleAnimationProp = { scale: 0.95 };

/** Type */
import type { CardType } from "@Types/index";

/* #region Responsive Style Map */
const cardSizeMap = {
  large: "w-full min-w-[60.83vw] max-w-[60.83vw]",
  medium: "w-full min-w-[44.44vw] max-w-[44.44vw]",
  small: "w-full min-w-[28.85vw] max-w-[28.85vw]",
};

const titleSizeMap = {
  large: "text-[4.44vw]",
  medium: "text-[3.88vw]",
  small: "text-[3.88vw]",
};

const subSizeMap = {
  large: "text-[3.88vw]",
  medium: "text-[3.33vw]",
  small: "text-[3.33vw]",
};

const spaceGapMap = {
  large: "space-y-[3.33vw]",
  medium: "space-y-[2.22vw]",
  small: "space-y-[2.22vw]",
};
/* #endregion */

type ContentCardBaseProp = {
  id: number;
  src: string | null;
  title: string;
  subTitle: string;
  cardType: CardType;
  onTap: (id: number) => void;
  additionalElements?: React.ReactNode;
};

const ContentCardBase = ({
  id,
  src,
  title,
  subTitle,
  cardType = "large",
  onTap,
  additionalElements,
}: ContentCardBaseProp) => {
  const cardSize = useMemo(() => cardSizeMap[cardType], []);
  const titleSize = useMemo(() => titleSizeMap[cardType], []);
  const subSize = useMemo(() => subSizeMap[cardType], []);
  const spaceGap = useMemo(() => spaceGapMap[cardType], []);

  const handleTap = useCallback(() => onTap(id), []);

  return (
    <motion.div
      whileTap={scaleAnimationProp}
      className={`flex aspect-[3/4] flex-col ${cardSize} overflow-hidden rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5]`}
      onTap={handleTap}
    >
      <div className="w-full object-cover">
        <FadedImage squareRatio src={src} />
      </div>

      <div className={` relative w-full translate-y-[-2.77vw] ${spaceGap}`}>
        <div className="relative">
          <p
            className={`line-clamp-1 w-full text-center ${titleSize} font-medium`}
          >
            {title}
          </p>
          <p
            className={`translate-y-[-0.25rem] text-center ${subSize} text-[#999]`}
          >
            {subTitle}
          </p>
        </div>

        {additionalElements && (
          <div className="flex w-full justify-center space-x-2">
            {additionalElements}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MemoedContentCardBase = React.memo(
  ContentCardBase,
  (prevProp, nextProp) => prevProp.id === nextProp.id,
);

export default MemoedContentCardBase;
