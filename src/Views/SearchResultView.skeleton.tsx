/** React 관련 */
import React, { useMemo } from "react";

/** Animation */
import { motion } from "framer-motion";
import { defaultAnimation } from "@Animation/index";

const SearchResultViewSkeleton = () => {
  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  return (
    <motion.div {...defaultAnimationProp} className="mt-[6.66vw]">
      <div className="h-[4.44vw] w-[50%] animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
      <div className=" mt-[3.33vw] grid grid-cols-2 gap-[4.44vw] ">
        <div className="aspect-[3/4] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
        <div className="aspect-[3/4] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
        <div className="aspect-[3/4] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
        <div className="aspect-[3/4] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
      </div>
    </motion.div>
  );
};

const MemoedSearchResultViewSkeleton = React.memo(SearchResultViewSkeleton);

export default MemoedSearchResultViewSkeleton;
