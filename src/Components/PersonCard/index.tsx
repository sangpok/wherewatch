/** React 관련 */
import React, { useCallback } from "react";

/** Component */
import FadedImage from "@Components/FadedImage";

/** Animation */
import { motion } from "framer-motion";

const whileTapProp = { scale: 0.9 };

type PersonCardProp = {
  id: number;
  profile: string;
  actorName: string;
  characterName: string;
  onTap: (id: number) => void;
};

const PersonCard = ({
  id,
  profile,
  actorName,
  characterName,
  onTap,
}: PersonCardProp) => {
  const handleTap = useCallback(() => onTap(id), []);

  return (
    <motion.div
      whileTap={whileTapProp}
      data-person-id={id}
      className=" inline-block aspect-[3/4] min-w-[28.05vw] max-w-[28.05vw] overflow-hidden rounded-[1.11vw] border-[0.27vw] border-[#f5F5F5] bg-white"
      onTap={handleTap}
    >
      <div className="w-full">
        <FadedImage
          src={profile && `http://image.tmdb.org/t/p/w300${profile}`}
          squareRatio
        />
      </div>
      <div className=" translate-y-[-2.2vw] space-y-[1.11vw]">
        <p className=" line-clamp-1 text-center text-[3.88vw] font-medium  leading-none">
          {actorName}
        </p>
        <p className=" line-clamp-1 text-center text-[3.33vw] leading-none text-[#999]">
          {characterName}
        </p>
      </div>
    </motion.div>
  );
};

const MemoedPersonCard = React.memo(
  PersonCard,
  (prevProp, nextProp) => prevProp.id === nextProp.id,
);

export default MemoedPersonCard;
