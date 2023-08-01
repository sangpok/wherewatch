import ContentCardBase from "./ContentCardBase";

import JoinedText from "@Components/JoinedText";

import { IMAGE_URI_W300 } from "@Constants/index";
import { getDepartmentName, getMovieGenre, getTVGenre } from "@Lib/genre";
import {
  CardType,
  TMDBCast,
  TMDBContent,
  TMDBCrew,
  TMDBMovie,
  TMDBPerson,
  TMDBTV,
} from "@Types/index";
import React, { useCallback } from "react";

// TODO: media_type에 따라서 UI를 편하게 설정할 수 있게 해야 할 것 같음. 지금 너무 .... 수동이야
// TODO: JOIN_TEXT 최대 3개만(장르)

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
  const imgURLW300 = IMAGE_URI_W300 as string;

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

  const contentCardBaseProps = {
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
  };

  return <ContentCardBase {...contentCardBaseProps} />;
};

const MemoedContentCard = React.memo(
  ContentCard,
  (prevProp, nextProp) =>
    prevProp.contentDetail.id === nextProp.contentDetail.id,
);

export default MemoedContentCard;
