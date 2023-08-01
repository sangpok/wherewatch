import React from "react";

import JoinedText from "@Components/JoinedText";
import WatchingRateBadge from "@Components/WatchingRatingBadge";

import { BackIcon } from "@Icons/index";

import { motion } from "framer-motion";

import type { WatchingRate } from "@Components/WatchingRatingBadge";

type ParagraphProp = {
  title: string;
  children: React.ReactNode;
};

export const Paragraph = React.memo(({ title, children }: ParagraphProp) => (
  <div className=" space-y-[3.33vw]">
    <p className=" text-[6.66vw] font-semibold leading-none">{title}</p>
    {children}
  </div>
));

type BackdropProp = {
  src: string | null;
  children: React.ReactNode;
};

export const Backdrop = React.memo(({ src, children }: BackdropProp) => (
  <div
    style={{
      backgroundImage: src ? `url('${src}')` : "none",
      backgroundSize: "cover",
    }}
    className="relative aspect-[2/1] w-full overflow-hidden bg-gray-500"
  >
    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black to-transparent to-20%" />
    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent from-60% to-white to-100%" />
    <div className="z-1">{children}</div>
  </div>
));

type BackButtonProp = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  fill?: string;
};

export const BackButton = React.memo(
  ({ onClick, fill = "white" }: BackButtonProp) => (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className=" max-w-[8.88vw] rounded-full drop-shadow-lg"
      onClick={onClick}
    >
      <BackIcon width="8.88" height="8.88" fill={fill} />
    </motion.div>
  ),
);

type ContentOutlineProp = {
  title?: string;
  watchingRate?: WatchingRate;
  descriptions?: Array<string>;
};

export const ContentOutline = React.memo(
  ({ title, watchingRate, descriptions }: ContentOutlineProp) => (
    <div className=" z-40 space-y-[1.11vw]">
      <p className="text-[7.77vw] font-bold leading-none">{title}</p>
      <div className="flex items-center space-x-[1.11vw]">
        {watchingRate && <WatchingRateBadge watchingRate={watchingRate} />}
        {descriptions && <JoinedText textList={descriptions} />}
      </div>
    </div>
  ),
);
