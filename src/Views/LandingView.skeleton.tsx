/** React */
import React, { useMemo } from "react";

/** Animation */
import { motion } from "framer-motion";
import { defaultAnimation } from "@Animation/index";

const LandingViewSkeleton = () => {
  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  return (
    <motion.div {...defaultAnimationProp} className="mt-[6.66vw]">
      <div className="h-[6.66vw] w-[60%] animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
      <div className="space-x-[4.44vw] whitespace-nowrap">
        <div className="mt-[3.33vw] inline-block aspect-[3/4] w-[60.83vw] animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
        <div className="mt-[3.33vw] inline-block aspect-[3/4] w-[60.83vw] animate-pulse rounded-[1.11vw] bg-[#EAEAEA]" />
      </div>
    </motion.div>
  );
};

const MemoedLandingViewSkeleton = React.memo(LandingViewSkeleton);

export default MemoedLandingViewSkeleton;
