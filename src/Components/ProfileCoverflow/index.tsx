/** React 관련 */
import React, { useCallback, useEffect, useState, useMemo } from "react";

/** Animation */
import { PanInfo, motion, useAnimate } from "framer-motion";

/* #region AnimationProp */
const initialAnimationProp = { scale: 0.7, opacity: 0 };

const transitionAnimationProp = {
  type: "spring",
  damping: 100,
  stiffness: 500,
};

const drapConstraintsProp = { left: 0, right: 0 };

const noAnimateProp = {
  scale: 1,
  opacity: 1,
};
/* #endregion */

type NavigationDotProp = {
  backgroundColor: string;
  index: number;
  onClick: (id: number) => void;
};

const NavigationDot = React.memo(
  ({ backgroundColor, index, onClick }: NavigationDotProp) => {
    return (
      <motion.div
        animate={{
          backgroundColor,
        }}
        className="block aspect-square w-[3.33vw]  rounded-full "
        onClick={useCallback(() => onClick(index), [])}
      />
    );
  },
);

type NavigationDotsProp = {
  current: number;
  max: number;
  onClick: (id: number) => void;
};

const NavigationDots = React.memo(
  ({ current, max, onClick }: NavigationDotsProp) => {
    return (
      <div className="mx-auto mt-[4.44vw] flex w-fit space-x-[1.11vw] rounded-[4.44vw] bg-white p-[1.11vw]">
        {Array(max)
          .fill(null)
          .map((_, index) => (
            <NavigationDot
              key={index}
              index={index}
              backgroundColor={index === current ? "#add8e6" : "#d3d3d3"}
              onClick={onClick}
            />
          ))}
      </div>
    );
  },
  (prevProp, nextProp) => prevProp.current === nextProp.current,
);

type ProfileImageProfile = {
  src: string | null;
  animate: {
    scale: number;
    opacity: number;
  };
};

const ProfileImage = React.memo(
  ({ src, animate }: ProfileImageProfile) => {
    return (
      <motion.div
        initial={initialAnimationProp}
        animate={animate}
        transition={transitionAnimationProp}
        className={` relative aspect-[3/4] min-w-[60.55vw] max-w-[60.55vw] select-none overflow-hidden rounded-[3.33vw] ${
          !src ? "bg-gray-500" : ""
        } shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)]`}
      >
        {src && (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url('http://image.tmdb.org/t/p/original${src}')`,
              backgroundSize: "cover",
            }}
          />
        )}
      </motion.div>
    );
  },
  (prevProp, nextProp) =>
    prevProp.animate.scale === nextProp.animate.scale &&
    prevProp.src === nextProp.src,
);

const NoProfileImage = React.memo(() => (
  <ProfileImage src={null} animate={noAnimateProp} />
));

type ProfileCoverflowProp = {
  viewport: Element;
  profiles: string[];
};

const ProfileCoverflow = ({ viewport, profiles }: ProfileCoverflowProp) => {
  const [scope, animate] = useAnimate();
  const [selectedId, setSelectedId] = useState(0);

  const viewportWidth = useMemo(
    () => viewport.clientWidth,
    [viewport.clientWidth],
  );

  const profileItemWidth = useMemo(
    () => (60.55 * viewportWidth) / 100,
    [viewportWidth],
  );

  useEffect(() => {
    if (!scope.current) return;

    animate(
      scope.current,
      {
        x: selectedId * -profileItemWidth,
      },
      { type: "spring", damping: 100, stiffness: 500 },
    )
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  }, [selectedId]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      // To Right
      const isToRight = offset >= viewportWidth / 3 || velocity >= 500;
      const isLeftEdgeId = selectedId - 1 < 0;
      if (isToRight && !isLeftEdgeId) {
        setSelectedId(selectedId - 1);
      }

      // To Left
      const isToLeft = offset <= -(viewportWidth / 3) || velocity <= -500;
      const isRightEdgeId = selectedId + 1 >= profiles.length;
      if (isToLeft && !isRightEdgeId) {
        setSelectedId(selectedId + 1);
      }
    },
    [selectedId],
  );

  return (
    <>
      <motion.div
        drag="x"
        dragConstraints={drapConstraintsProp}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className="relative w-fit"
      >
        <div
          ref={scope}
          className="ml-[19.72vw] mt-[28.05vw] flex w-fit whitespace-nowrap "
        >
          {profiles.length === 0 && <NoProfileImage />}

          {profiles.map((profile, index) => (
            <ProfileImage
              key={index}
              src={profile}
              animate={{
                scale: index === selectedId ? 1 : 0.9,
                opacity: index === selectedId ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      <NavigationDots
        max={profiles.length || 1}
        current={selectedId}
        onClick={useCallback((id) => setSelectedId(id), [])}
      />
    </>
  );
};

const MemoedProfileCoverflow = React.memo(ProfileCoverflow);

export default MemoedProfileCoverflow;
