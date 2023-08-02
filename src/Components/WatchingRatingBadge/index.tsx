/** React */
import React from "react";

/** Type */
import { WatchingRate } from "@Types/index";

type WatchingRateBadgeProp = {
  watchingRate: WatchingRate;
};

/* #region Color Map By WatchingRate */
const borderColorMap = {
  ALL: "border-black",
  "7": "border-[#D6CF2C]",
  "12": "border-[#6AC026]",
  "15": "border-[#51AFE3]",
  "19": "border-[#E35151]",
};

const textColorMap = {
  ALL: "text-black",
  "7": "text-[#D6CF2C]",
  "12": "text-[#6AC026]",
  "15": "text-[#51AFE3]",
  "19": "text-[#E35151]",
};
/* #endregion */

const WatchingRateBadge = ({ watchingRate }: WatchingRateBadgeProp) => {
  return (
    <div
      className={` rounded-[1.11vw] border-[0.27vw] ${borderColorMap[watchingRate]} flex select-none items-center justify-center bg-white px-[1.11vw]`}
    >
      <span
        className={`leading-none ${textColorMap[watchingRate]} text-[3.33vw] font-normal`}
      >
        {watchingRate}
      </span>
    </div>
  );
};

const MemoedWatchingRateBadge = React.memo(WatchingRateBadge);

export default MemoedWatchingRateBadge;
