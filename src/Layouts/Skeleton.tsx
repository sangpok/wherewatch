/** React 관련 */
import React, { useMemo } from "react";

/** Animation */
import { motion } from "framer-motion";
import { defaultAnimation } from "@Animation/index";

const Skeleton = () => {
  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  return (
    <motion.div
      {...defaultAnimationProp}
      className=" mt-[2.22vw] h-[8.88vw] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]"
    ></motion.div>
  );
};

const MemoedSkeleton = React.memo(Skeleton);

export default MemoedSkeleton;
