import React, { useCallback } from "react";

import FadedImage from "@Components/FadedImage";

import { motion } from "framer-motion";

import { CardType } from "@Types/index";

type ContentCardBaseProp = {
  id: number;
  src: string | null;
  title: string;
  subTitle: string;
  cardType: CardType;
  onTap: (id: number) => void;
  additionalElements?: React.ReactNode;
};

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

const ContentCardBase = ({
  id,
  src,
  title,
  subTitle,
  cardType = "large",
  onTap,
  additionalElements,
}: ContentCardBaseProp) => {
  const cardSize = cardSizeMap[cardType];
  const titleSize = titleSizeMap[cardType];
  const subSize = subSizeMap[cardType];
  const spaceGap = spaceGapMap[cardType];

  const handleTap = useCallback(() => onTap(id), []);

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
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
