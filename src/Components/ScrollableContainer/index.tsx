import React, { useRef } from "react";

import { motion } from "framer-motion";

type ScrollableContainerProp = {
  gapType?: "large" | "default";
  children: React.ReactNode;
};

const ScrollableContainer = ({
  gapType = "default",
  children,
}: ScrollableContainerProp) => {
  const slideRef = useRef<HTMLDivElement>(null);

  const spaceGap = gapType === "default" ? "gap-[2.22vw]" : "gap-[4.44vw]";

  return (
    <div ref={slideRef} className="overflow-hidden">
      <motion.div drag="x" dragConstraints={slideRef} className="w-fit">
        <div className={`flex w-fit flex-row ${spaceGap} whitespace-nowrap`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollableContainer;
