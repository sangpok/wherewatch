import { TMDBContent, TMDBPerson, TMDBResponse } from "@Types/index";

function api<T>(url: string, option: RequestInit): Promise<T> {
  return fetch(url, option).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

export const getTrendingRank = () =>
  api<TMDBResponse<TMDBContent>>(
    "https://api.themoviedb.org/3/trending/all/week?language=ko",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZjYzE0MDIzYTc0NzEyZjJiMmNhM2Q3Njk1YmMwMCIsInN1YiI6IjYyYmJkN2YyNjhiNzY2MDA1MTIyY2ExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGTtXCdSiOBktCa8Rw1HhLIH1dDxp2MlsheCyMHSZqY",
      },
    },
  ).then((response) => response);

export const getSuggestions = (keyword: string | null, currentPage: number) => {
  if (!keyword) {
    return { results: [] } as TMDBResponse<TMDBContent>;
  }

  return api<TMDBResponse<TMDBContent>>(
    `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&page=${currentPage}&language=ko`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZjYzE0MDIzYTc0NzEyZjJiMmNhM2Q3Njk1YmMwMCIsInN1YiI6IjYyYmJkN2YyNjhiNzY2MDA1MTIyY2ExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGTtXCdSiOBktCa8Rw1HhLIH1dDxp2MlsheCyMHSZqY",
      },
    },
  ).then((response) => response);
};

export const getContentDetail = (type: string, contentId?: string) => {
  if (!contentId) {
    return {} as TMDBContent;
  }

  return api<TMDBContent>(
    `https://api.themoviedb.org/3/${type}/${contentId}?append_to_response=watch%2Fproviders,credits,videos,${
      type === "tv" ? "content_ratings" : "release_dates"
    }&language=ko`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZjYzE0MDIzYTc0NzEyZjJiMmNhM2Q3Njk1YmMwMCIsInN1YiI6IjYyYmJkN2YyNjhiNzY2MDA1MTIyY2ExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGTtXCdSiOBktCa8Rw1HhLIH1dDxp2MlsheCyMHSZqY",
      },
    },
  ).then((response) => response);
};

export const getPersonDetail = (personId?: string) => {
  if (!personId) {
    return {} as TMDBPerson;
  }

  return api<TMDBPerson>(
    `https://api.themoviedb.org/3/person/${personId}?append_to_response=combined_credits,images&language=ko`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZjYzE0MDIzYTc0NzEyZjJiMmNhM2Q3Njk1YmMwMCIsInN1YiI6IjYyYmJkN2YyNjhiNzY2MDA1MTIyY2ExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGTtXCdSiOBktCa8Rw1HhLIH1dDxp2MlsheCyMHSZqY",
      },
    },
  ).then((response) => response);
};
