export type TMDBCommon = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: Array<number>;
  genres: Array<DetailGenre>;
  tagline: string;
  popularity: number;
  status: string;
  vote_average: number;
  vote_count: number;
  origin_country: Array<string>;
  "watch/providers": TMDBObjectReponse<TMDBCountryResponse<TMDBProviderList>>;
  credits: TMDBCredit;
  videos: TMDBResponse<TMDBVideo>;
};

export type TMDBMovie = {
  title: string;
  original_title: string;
  popularity: number;
  release_date: string;
  runtime: number;
  release_dates: TMDBResponse<TMDBReleaseDates>;
} & Required<TMDBCommon>;

export type TMDBTV = {
  name: string;
  original_name: string;
  first_air_date: string;
  content_ratings: TMDBResponse<TMDBContentRating>;
} & Required<TMDBCommon>;

export type TMDBPerson = {
  name: string;
  original_name: string;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: Array<TMDBContent>;
  combined_credits: TMDBCredit;
  images: TMDBImages;
  birthday: string;
} & Required<TMDBCommon>;

export type TMDBContent = TMDBCommon &
  Partial<TMDBMovie & TMDBTV & TMDBPerson & TMDBCast & TMDBCrew>;

export type TMDBCast = {
  character: string;
} & TMDBPerson;

export type TMDBCrew = {
  department: string;
  job: string;
} & TMDBPerson;

export type TMDBCastList = Array<TMDBCast>;

export type TMDBCrewList = Array<TMDBCrew>;

export type TMDBCredit = {
  cast: TMDBCastList;
  crew: TMDBCrewList;
};

export type TMDBVideo = {
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
};

export type TMDBImages = {
  profiles: Array<TMDBProfile>;
};

export type TMDBProfile = {
  file_path: string;
};

export type TMDBResponse<T> = {
  results: Array<T>;
  total_results?: number;
  total_pages?: number;
};

export type TMDBObjectReponse<T> = {
  results: T;
};

export type TMDBProviderType = "buy" | "flatrate" | "rent" | "free";

export type TMDBPlatform = {
  name: string;
  icon: string;
};

export type AvailableProvider = {
  type: TMDBProviderType;
  providers: TMDBPlatform[];
};

export type TMDBProviderList = {
  [key in TMDBProviderType]: Array<TMDBProvider>;
};

export type TMDBProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type TMDBCountryResponse<T> = {
  KR: T;
};

export type TMDBReleaseDates = {
  iso_3166_1: string;
  release_dates: Array<TMDBContentRating>;
};

export type TMDBContentRating = {
  descriptors: Array<any>;
  iso_3166_1: string;
  rating: WatchingRate;
  certification: WatchingRate;
};

export type DetailGenre = {
  id: number;
  name: string;
};

export type CardType = "large" | "medium" | "small";

export type KeywordHistory = {
  keyword: string;
  date: string;
};

export type WatchingRate = "ALL" | "7" | "12" | "15" | "19";
