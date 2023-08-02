/** React */
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

/** Component */
import ContentCard from "@Components/ContentCard";
import LandingViewSkeleton from "./LandingView.skeleton";
import ScrollableContainer from "@Components/ScrollableContainer";

/** Animation */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** API */
import { getTrendingRank } from "@API/index";
import { useQuery } from "react-query";

/** Type */
import type { TMDBContent, TMDBResponse } from "@Types/index";

const LandingView = () => {
  const navigate = useNavigate();

  const { isLoading, data: trending } = useQuery<TMDBResponse<TMDBContent>>(
    ["trending"],
    getTrendingRank,
  );

  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  if (isLoading) {
    return <LandingViewSkeleton />;
  }

  if (!trending) {
    return;
  }

  return (
    <motion.div {...defaultAnimationProp} className=" mt-[6.66vw] gap-[6.66vw]">
      <div className="space-y-[3.33vw]">
        <p className=" text-[6.66vw] font-bold">최근 인기있는 작품들</p>
        <ScrollableContainer>
          {trending.results.map((result, index) => (
            <ContentCard
              key={`${result.id}-${index}`}
              mediaType={result.media_type}
              contentDetail={result}
              onTap={() => navigate(`${result.media_type}/${result.id}`)}
            />
          ))}
        </ScrollableContainer>
      </div>
    </motion.div>
  );
};

const MemoedLandingView = React.memo(LandingView);

export default MemoedLandingView;
