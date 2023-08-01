/** React */
import React from "react";
import { useNavigate } from "react-router-dom";

/** Component */
import ContentCard from "@Components/ContentCard";
import Skeleton from "@Layouts/Skeleton";

/** Animation */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** API */
import { getTrendingRank } from "@API/index";
import { useQuery } from "react-query";

/** Type */
import ScrollableContainer from "@Components/ScrollableContainer";
import type { TMDBContent, TMDBResponse } from "@Types/index";

const LandingView = () => {
  const navigate = useNavigate();

  const { isLoading, data: trending } = useQuery<TMDBResponse<TMDBContent>>(
    ["trending"],
    getTrendingRank,
  );

  if (isLoading) {
    return <Skeleton />;
  }

  if (!trending) {
    return;
  }

  return (
    <motion.div {...defaultAnimation} className=" mt-[6.66vw] gap-[6.66vw]">
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
