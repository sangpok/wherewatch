import StarRating from "@Components/StarRating";
import {
  AvailableProvider,
  TMDBContent,
  TMDBMovie,
  TMDBProvider,
  TMDBProviderType,
  TMDBTV,
} from "@Types/index";
import { getDepartmentName } from "./genre";

export function getSuggestionItemType(suggestion: TMDBContent) {
  const { media_type: mediaType, known_for: knownFor } = suggestion;

  if (mediaType === "person" && knownFor?.length !== 0) {
    return "group";
  }

  return "default";
}

export function getThumbnailSrc(suggestion: TMDBContent) {
  const {
    media_type: mediaType,
    profile_path: profilePath,
    poster_path: posterPath,
  } = suggestion;

  if (mediaType === "person") {
    return profilePath
      ? `http://image.tmdb.org/t/p/original${profilePath}`
      : "";
  }

  return posterPath ? `http://image.tmdb.org/t/p/original${posterPath}` : "";
}

export function getTitle(suggestion: TMDBContent) {
  const { media_type: mediaType, name, title } = suggestion;

  if (mediaType === "tv" || mediaType === "person") {
    return name || "-";
  }

  return title || "-";
}

type MediaTypeName = {
  [key: string]: string;
};

export function getMediaTypeName(mediaType: string) {
  const nameMap: MediaTypeName = {
    tv: "TV프로그램",
    movie: "영화",
    person: "인물",
  };

  return nameMap[mediaType];
}

export function getDescriptions(suggestion: TMDBContent) {
  const {
    media_type: mediaType,
    first_air_date: firstAirDate,
    release_date: releaseDate,
    known_for_department: department,
  } = suggestion;
  const descriptions = [];

  descriptions.push(getMediaTypeName(mediaType));

  if (mediaType === "tv" && firstAirDate) {
    descriptions.push(firstAirDate.substring(0, 4));
  } else if (mediaType === "movie" && releaseDate) {
    descriptions.push(releaseDate.substring(0, 4));
  } else if (mediaType === "person" && department) {
    descriptions.push(getDepartmentName(department));
  }

  return descriptions;
}

export function getTVDescription(contentDetail: TMDBContent) {
  const { first_air_date: firstAirDate } = contentDetail as TMDBTV;
  const descriptions = [];

  descriptions.push("TV프로그램");

  if (contentDetail.genres.length !== 0) {
    descriptions.push(
      contentDetail.genres.map(({ name }: { name: string }) => name).join(", "),
    );
  }

  if (firstAirDate !== "") {
    descriptions.push(firstAirDate.substring(0, 4));
  }

  return descriptions;
}

export function getMovieDescription(contentDetail: TMDBContent) {
  const { release_date: releaseDate } = contentDetail as TMDBMovie;
  const descriptions = [];

  descriptions.push("영화");

  if (contentDetail.genres.length !== 0) {
    descriptions.push(
      contentDetail.genres.map(({ name }: { name: string }) => name).join(", "),
    );
  }

  if (!releaseDate && contentDetail.status === "Planned") {
    descriptions.push("개봉예정");
  } else {
    descriptions.push(releaseDate.substring(0, 4));
  }

  return descriptions;
}

export function getAdditionalElement(suggestion: TMDBContent) {
  const { vote_average } = suggestion;

  if (vote_average && vote_average !== 0) {
    return <StarRating rating={vote_average.toFixed(1) || "0.0"} />;
  }
}

export function getProviderAvailable(contentDetail: TMDBContent) {
  const returnProviderInfo = (providers: TMDBProvider[]) =>
    providers.map(({ provider_name, logo_path }) => ({
      name: provider_name,
      icon: logo_path,
    }));

  const KRProviders = contentDetail["watch/providers"].results["KR"];
  const providers: AvailableProvider[] = [] as AvailableProvider[];

  if (!KRProviders) return providers;

  const providerTypes: TMDBProviderType[] = ["buy", "flatrate", "rent", "free"];

  for (const provideType of providerTypes) {
    if (KRProviders[provideType]) {
      providers.push({
        type: provideType,
        providers: returnProviderInfo(KRProviders[provideType]),
      });
    }
  }

  return providers;
}
