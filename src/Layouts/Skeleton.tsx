import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";
import React from "react";

const Skeleton = () => {
  return (
    <motion.div
      {...defaultAnimation}
      className=" mt-[2.22vw] h-[8.88vw] w-full animate-pulse rounded-[1.11vw] bg-[#EAEAEA]"
    ></motion.div>
  );
};

const MemoedSkeleton = React.memo(Skeleton);

export default MemoedSkeleton;
