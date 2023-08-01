import React from "react";

type StarRatingProp = {
  rating: string;
};

const StarRating = ({ rating }: StarRatingProp) => {
  return (
    <div className=" flex select-none items-center space-x-[0.55vw]">
      <span className="text-[3.33vw]">⭐</span>
      <span className="text-[3.88vw]">{rating}</span>
    </div>
  );
};

const MemoedStarRating = React.memo(StarRating);

export default MemoedStarRating;
