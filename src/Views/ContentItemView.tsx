/** React */
import React, { useCallback, useMemo } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

/** Component */
import ContentCard from "@Components/ContentCard";
import ProviderTab from "@Components/ProviderTab";
import ScrollableContainer from "@Components/ScrollableContainer";
import Wherewatch from "@Components/Wherewatch";

/** Hook */
import useNavigateBack from "@Hooks/useNavigateBack";

/** Styled Component */
import {
  BackButton,
  Backdrop,
  ContentOutline,
  Paragraph,
} from "./ContentItemView.styled";

/** Icon */
import SyncLoader from "react-spinners/SyncLoader";

/** Animation */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** API */
import { getContentDetail } from "@API/index";
import { useQuery } from "react-query";

/** Types */
import type {
  TMDBCast,
  TMDBContent,
  TMDBCrew,
  WatchingRate,
} from "@Types/index";

/** Util */
import {
  getMovieDescription,
  getProviderAvailable,
  getTVDescription,
} from "@Lib/tmdb";

/** Constant */
import { IMAGE_URI_ORIGINAL } from "@Constants/index";
const imageURIOriginal = IMAGE_URI_ORIGINAL as string;

type LinkedWherewatchProp = {
  smallType: boolean;
  onClick: () => void;
};

const LinkedWherewatch = React.memo(
  ({ smallType, onClick }: LinkedWherewatchProp) => {
    return (
      <NavLink to="/" onClick={onClick}>
        <Wherewatch smallType={smallType} fill="white" />
      </NavLink>
    );
  },
  (prevProp, nextProp) => prevProp.smallType === nextProp.smallType,
);

type ContentItemViewProp = {
  type: "tv" | "movie";
};

const ContentItemView = ({ type: contentType }: ContentItemViewProp) => {
  const navigate = useNavigate();
  const navigateBack = useNavigateBack();
  const { id } = useParams();

  const { isLoading, data: contentDetail } = useQuery<TMDBContent>(
    ["detail", id],
    () => getContentDetail(contentType, id),
  );

  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  const handleWherewatchClick = useCallback(() => navigate("/"), []);

  if (isLoading) {
    return (
      <motion.div
        {...defaultAnimationProp}
        className="mt-[10vw] flex w-full items-center justify-center"
      >
        <SyncLoader />
      </motion.div>
    );
  }

  if (!contentDetail) {
    return;
  }

  // prettier-ignore
  const { backdrop_path, poster_path, title, name, release_dates, content_ratings, overview, tagline, credits, videos } = contentDetail;
  const { cast, crew } = credits;

  const watchingRate = (() => {
    if (contentType === "movie") {
      if (!release_dates) return "ALL" as WatchingRate;

      const KRReleaseDate = release_dates.results.find(
        ({ iso_3166_1: nation }) => nation === "KR",
      );

      if (!KRReleaseDate) return "ALL" as WatchingRate;

      return KRReleaseDate.release_dates[0].certification;
    }

    if (contentType === "tv") {
      if (!content_ratings) return "ALL" as WatchingRate;

      const KRContentRating = content_ratings.results.find(
        ({ iso_3166_1: nation }) => nation === "KR",
      );

      if (!KRContentRating) return "ALL" as WatchingRate;

      return KRContentRating.rating;
    }
  })();

  const backdropSrc = (() => {
    if (backdrop_path) return imageURIOriginal + backdrop_path;
    if (poster_path) return imageURIOriginal + poster_path;

    return null;
  })();

  const youtubeVideo = (() => {
    const KRYoutubeVideo = videos.results.find(
      ({ iso_3166_1: nation, site }) => nation === "KR" && site === "YouTube",
    );

    return KRYoutubeVideo;
  })();

  const providerList = (() => {
    return getProviderAvailable(contentDetail);
  })();

  const contentDescriptions = (() => {
    if (contentType === "tv") return getTVDescription(contentDetail);
    if (contentType === "movie") return getMovieDescription(contentDetail);
  })();

  const returnContentCard = (
    type: string,
    credit: TMDBCast | TMDBCrew,
    index: number,
  ) => {
    const { id } = credit;
    return (
      <ContentCard
        key={`${type}-${id}-${index}`}
        mediaType="person"
        contentDetail={credit}
        onTap={() => navigate(`/person/${id}`)}
        cardType="small"
      />
    );
  };

  return (
    <motion.div {...defaultAnimationProp} className="mb-[8.88vw]">
      <Backdrop src={backdropSrc}>
        <div className="absolute left-[3.33vw] top-[6.66vw] flex flex-row place-content-center place-items-center gap-[1.11vw] ">
          <BackButton onClick={navigateBack} />

          <LinkedWherewatch smallType={false} onClick={handleWherewatchClick} />
        </div>
      </Backdrop>

      <div className="mx-[2.22vw]  translate-y-[-4.16vw] space-y-[8.88vw]">
        <ContentOutline
          title={title || name}
          watchingRate={watchingRate}
          descriptions={contentDescriptions}
        />

        <Paragraph title="제공하는 플랫폼">
          {providerList.length === 0 ? (
            <p className="text-[4.44vw]">
              한국에 제공하는 플랫폼이 존재하지 않습니다😢
            </p>
          ) : (
            <ProviderTab
              tabs={providerList.map(({ type }) => type)}
              contents={providerList.map(({ providers }) => providers)}
            />
          )}
        </Paragraph>

        <Paragraph title="작품 정보">
          <p className="text-[4.44vw]">
            {overview === "" && "작품 정보가 존재하지 않습니다😢"}
            {overview}
          </p>
        </Paragraph>

        {tagline && (
          <Paragraph title="태그 라인">
            <p className="text-[4.44vw]">{tagline}</p>
          </Paragraph>
        )}

        {youtubeVideo && (
          <Paragraph title="동영상">
            <iframe
              className=" aspect-video w-full rounded-[1.11vw]"
              src={`https://www.youtube.com/embed/${youtubeVideo.key}`}
              title={youtubeVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </Paragraph>
        )}

        <Paragraph title="출연진">
          {cast.length === 0 && (
            <p className="text-[4.44vw]">출연진 정보가 존재하지 않습니다😢</p>
          )}

          {cast.length !== 0 && (
            <ScrollableContainer gapType="large">
              {cast.map((credit, index) =>
                returnContentCard("cast", credit, index),
              )}
            </ScrollableContainer>
          )}
        </Paragraph>

        <Paragraph title="제작진">
          {crew.length === 0 && (
            <p className="text-[4.44vw]">제작진 정보가 존재하지 않습니다😢</p>
          )}

          {crew.length !== 0 && (
            <ScrollableContainer gapType="large">
              {crew.map((credit, index) =>
                returnContentCard("crew", credit, index),
              )}
            </ScrollableContainer>
          )}
        </Paragraph>
      </div>
    </motion.div>
  );
};

const MemoedContentItemView = React.memo(ContentItemView);

export default MemoedContentItemView;
