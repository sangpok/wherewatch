type Genre = {
  [key: number]: string;
};

const movieGenres: Genre = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스터리",
  10749: "로맨스",
  878: "SF",
  10770: "TV 영화",
  53: "스릴러",
  10752: "전쟁",
  37: "서부",
};

const tvGenres: Genre = {
  10759: "액션",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  10762: "유아",
  9648: "미스터리",
  10763: "뉴스",
  10764: "리얼리티",
  10765: "SF",
  10766: "아침드라마(Soap)",
  10767: "토크",
  10768: "전쟁",
  37: "서부",
};

type Department = {
  [key: string]: string;
};

const departments: Department = {
  Acting: "배우",
  Actors: "배우",
  Art: "미술",
  Camera: "카메라",
  "Costume & Make-Up": "의상 & 분장",
  Creator: "창작자",
  Crew: "제작진",
  Directing: "연출",
  Editing: "편집",
  Lighting: "조명",
  Production: "제작",
  Sound: "음향",
  "Visual Effects": "시각 효과",
  Writing: "각본",
};

export function getTVGenre(genreId: number) {
  return tvGenres[genreId];
}

export function getMovieGenre(genreId: number) {
  return movieGenres[genreId];
}

export function getDepartmentName(departmentName: string) {
  return departments[departmentName];
}
