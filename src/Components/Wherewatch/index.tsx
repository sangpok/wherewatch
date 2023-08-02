/** React */
import React from "react";

/** Animation */
import { motion } from "framer-motion";

type WherewatchProps = {
  smallType?: boolean;
  fill?: string;
};

const animationProps = {
  initial: { fontWeight: 900, fontSize: "6.66vw" },
  animate: (smallType: boolean) => ({
    fontWeight: smallType ? 700 : 900,
    fontSize: smallType ? "3.88vw" : "6.66vw",
  }),
};

const Wherewatch = ({ smallType = false, fill = "black" }: WherewatchProps) => {
  return (
    <motion.div
      variants={animationProps}
      initial="initial"
      animate="animate"
      custom={smallType}
      key="wherewatch-logo"
      className={fill === "black" ? "text-black" : "text-white"}
    >
      Wherewatch
    </motion.div>
  );
};

const MemoedWherewatch = React.memo(
  Wherewatch,
  (prevProp, nextProp) => prevProp.smallType === nextProp.smallType,
);

export default MemoedWherewatch;
