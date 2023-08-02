/** React 관련 */
import React, { useCallback, useMemo } from "react";

/** Component */
import ContentCardBase from "./ContentCardBase";
import JoinedText from "@Components/JoinedText";

/** Constant */
import { IMAGE_URI_W300 } from "@Constants/index";
const imgURLW300 = IMAGE_URI_W300 as string;

/** Lib */
import { getDepartmentName, getMovieGenre, getTVGenre } from "@Lib/genre";

/** Type */
import type {
  CardType,
  TMDBCast,
  TMDBContent,
  TMDBCrew,
  TMDBMovie,
  TMDBPerson,
  TMDBTV,
} from "@Types/index";

type ContentCardProp = {
  mediaType: string;
  contentDetail: TMDBContent;
  cardType?: CardType;
  onTap: (id: number) => void;
};

const ContentCard = ({
  mediaType,
  contentDetail,
  cardType = "large",
  onTap,
}: ContentCardProp) => {
  const getSubTitle = useCallback(() => {
    if (mediaType === "movie") {
      return contentDetail.release_date
        ? contentDetail.release_date.substring(0, 4)
        : "-";
    }

    if (mediaType === "tv") {
      return contentDetail.first_air_date
        ? contentDetail.first_air_date.substring(0, 4)
        : "-";
    }

    if (mediaType === "person") {
      return contentDetail.character
        ? contentDetail.character
        : contentDetail.job
        ? getDepartmentName((contentDetail as TMDBCrew).job)
        : "인물";
    }

    return "-";
  }, [contentDetail, mediaType]);

  const contentCardBaseProps = useMemo(
    () => ({
      id: contentDetail.id,
      src: (contentDetail as TMDBMovie | TMDBTV).poster_path
        ? imgURLW300 + (contentDetail as TMDBMovie | TMDBTV).poster_path
        : (contentDetail as TMDBPerson).profile_path
        ? imgURLW300 + (contentDetail as TMDBPerson).profile_path
        : null,
      title:
        (contentDetail as TMDBMovie).title ||
        (contentDetail as TMDBTV | TMDBPerson).name,
      subTitle: getSubTitle(),
      cardType,
      onTap,
      additionalElements:
        mediaType === "movie" ? (
          (contentDetail as TMDBMovie).genre_ids.length !== 0 ? (
            <JoinedText
              textList={(contentDetail as TMDBMovie).genre_ids
                .slice(0, 3)
                .map(getMovieGenre)}
            />
          ) : (
            <JoinedText textList={["-"]} />
          )
        ) : mediaType === "tv" ? (
          (contentDetail as TMDBTV).genre_ids.length !== 0 ? (
            <JoinedText
              textList={(contentDetail as TMDBTV).genre_ids
                .slice(0, 3)
                .map(getTVGenre)}
            />
          ) : (
            <JoinedText textList={["-"]} />
          )
        ) : (
          <JoinedText
            textList={[
              getDepartmentName(
                (contentDetail as TMDBPerson | TMDBCast | TMDBCrew)
                  .known_for_department,
              ),
            ]}
          />
        ),
    }),
    [contentDetail],
  );

  return <ContentCardBase {...contentCardBaseProps} />;
};

const MemoedContentCard = React.memo(
  ContentCard,
  (prevProp, nextProp) =>
    prevProp.contentDetail.id === nextProp.contentDetail.id,
);

export default MemoedContentCard;
