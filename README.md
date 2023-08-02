# OTT 검색 서비스: Wherewatch
---
*내가 원하는 OTT 작품을 언제 어디서든 편하게 검색해보세요!*

## 서비스 소개

OTT서비스 마다 제공하는 콘텐츠가 차이가 있다보니 어디에서 볼 수 있는지 찾기가 힘든 경우가 있습니다. `Wherewatch`는 TMDB에서 제공하는 API를 사용하여 본인이 원하는 OTT 콘텐츠가 어디에 있는지 쉽게 검색할 수 있는 서비스입니다.

## 서비스 정보 개요

#### Deploy URL
- https://web-wherewatch-3prof2llksd6nx5.sel4.cloudtype.app/

#### 화면설계 URL
- [Wherewatch UI / Figma URL](https://www.figma.com/file/My6S2nDJSUg0MB8AffCyem/Wherewatch-v2?type=design&node-id=0%3A1&mode=design&t=DjYF73dVE9Q9ZTbR-1)

#### Tech Stack
- **Frontend**: `React`, `Typescript`, `VITE`, `React-Query`, `Tailwind`, `Framer-motion`, `React-Router-Dom`, 
- **Backend**: [TMDB API](https://developer.themoviedb.org/docs)

#### 프로젝트 폴더 구조
```bash
│  App.tsx
│  index.css
│  main.tsx
│
├─Animation
│      index.ts
│
├─API
│      index.ts
│
├─Assets
│      back-24.svg
│      close-24.svg
│      close-circle-24.svg
│      history-24.svg
│      search-icon-24.svg
│
├─Components
│  ├─ContentCard
│  │  │  index.tsx
│  │  │
│  │  └─ContentCardBase
│  │          index.tsx
│  │
│  ├─FadedImage
│  │      index.tsx
│  │
│  ├─HistoryDate
│  │      index.tsx
│  │
│  ├─JoinedText
│  │      index.tsx
│  │
│  ├─LazyImage
│  │      index.tsx
│  │
│  ├─PersonCard
│  │      index.tsx
│  │
│  ├─ProfileCoverflow
│  │      index.tsx
│  │
│  ├─ProviderTab
│  │      index.tsx
│  │
│  ├─SavedKeywordCard
│  │      index.tsx
│  │
│  ├─ScrollableContainer
│  │      index.tsx
│  │
│  ├─SearchInput
│  │      index.tsx
│  │
│  ├─StarRating
│  │      index.tsx
│  │
│  ├─SuggestionItem
│  │  │  index.tsx
│  │  │
│  │  └─SuggestionBase
│  │          index.tsx
│  │
│  ├─WatchingRatingBadge
│  │      index.tsx
│  │
│  └─Wherewatch
│          index.tsx
│
├─Constants
│      index.ts
│
├─Fonts
│      index.css
│
├─Hooks
│      useDebounce.ts
│      useIntersectionObserver.ts
│      useLocalStorage.ts
│      useNavigateBack.ts
│      usePage.ts
│
├─Icons
│      index.tsx
│
├─Layouts
│      RootLayout.tsx
│      Skeleton.tsx
│
├─Lib
│      general.ts
│      genre.ts
│      QueryClient.ts
│      tmdb.tsx
│
├─Styles
│      index.tsx
│
├─Types
│      index.ts
│
└─Views
        ContentItemView.styled.tsx
        ContentItemView.tsx
        LandingView.skeleton.tsx
        LandingView.tsx
        PersonView.tsx
        SearchModeView.tsx
        SearchResultView.skeleton.tsx
        SearchResultView.tsx
```


## 페이지 및 기능별 구현 화면

### 인덱스 페이지(검색 모드X)
- 경로: `/`
- 최근 인기있는 작품들 Fetching
- 불러오는 동안 Skeleton Component 표출
- 콘텐츠 목록 Draggable Scroll
![](https://velog.velcdn.com/images/sangpok/post/fffcbb39-ac4b-4afe-9921-e1b863c0fd15/image.gif)

### 인덱스 페이지(검색 모드O)
- Wherewatch 로고와 검색 박스 애니메이션
- 검색 모드 화면으로 Page Transition
- 자동저장에 따른 최근 검색한 키워드 표출
- 검색 모드 종료시 이전 화면으로 이동
![](https://velog.velcdn.com/images/sangpok/post/bd2f3e8b-d5ed-48bd-ae80-a31075665977/image.gif)

### 검색모드, 연관 검색어
- 키워드에 따라 연관되는 콘텐츠 및 인물 표출
- 인물일 경우 참여한 유명 콘텐츠 함께 표출
- 포함되는 키워드에 Higtlight
![](https://velog.velcdn.com/images/sangpok/post/c0b1fb0f-dcfb-4cc9-938f-9a2a0f44df11/image.gif)

### 검색 결과 페이지(검색 모드X)
- 경로: `/search?query=[QUERY]`
- Fetching되는 동안 Skeleton 나타남
- 화면 하단에 닿을 시 다음 페이지 로딩(무한 스크롤)
![](https://velog.velcdn.com/images/sangpok/post/6ea39406-4f83-4dc6-9c65-7eeaeba3e821/image.gif)

### 검색 결과 페이지(검색 모드O)
- 검색 결과 페이지에서도 검색 모드로 전환 가능
![](https://velog.velcdn.com/images/sangpok/post/118b6d5d-8868-4681-ab39-c306932523d4/image.gif)

### 콘텐츠 상세 페이지(영화, TV프로그램)
- 경로: `/tv/:id`, `/movie/:id`
- 콘텐츠를 불러오는 동안 로딩 아이콘 표출
- 해당 콘텐츠 정보 표출
![](https://velog.velcdn.com/images/sangpok/post/807ee755-88de-4254-b6e4-d37baa6abd9c/image.gif)

### 콘텐츠 상세 페이지(인물)
- 경로: `/person/:id`
- 콘텐츠를 불러오는 동안 로딩 아이콘 표출
- 인물 프로필 Coverflow
- 해당 인물 정보 표출
- 해당 인물이 참여한 작품 표출
![](https://velog.velcdn.com/images/sangpok/post/c8acbe08-2930-4626-9cb3-282caeb9d77c/image.gif)

---

# 개발 일지
- [Wherewatch 개발일지 /Velog 시리즈](https://velog.io/@sangpok/series/Wherewatch-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80)
1. [OTT 검색 서비스: Wherewatch - (1)디자인](https://velog.io/@sangpok/OTT-%EA%B2%80%EC%83%89-%EC%84%9C%EB%B9%84%EC%8A%A4-Wherewatch-1%EB%94%94%EC%9E%90%EC%9D%B8)
2. [OTT 검색 서비스: Wherewatch - (2)Resizing에 대한 고민](https://velog.io/@sangpok/OTT-%EA%B2%80%EC%83%89-%EC%84%9C%EB%B9%84%EC%8A%A4-Wherewatch-2-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EA%B3%84)
3. [OTT 검색 서비스: Wherewatch - (3)Framer Motion dragConstraints 버그](https://velog.io/@sangpok/Framer-Motion-dragConstraints-%EB%B2%84%EA%B7%B8)
4. [OTT 검색 서비스: Wherewatch - (4)Framer Motion + React Router v6 Nested / Page Transition](https://velog.io/@sangpok/OTT-%EA%B2%80%EC%83%89-%EC%84%9C%EB%B9%84%EC%8A%A4-Wherewatch-4-Framer-Motion-React-Router-v6-Nested-Page-Transition)
5. [OTT 검색 서비스: Wherewatch - (5)Coverflow(or Carousel?) 구현기](https://velog.io/@sangpok/OTT-%EA%B2%80%EC%83%89-%EC%84%9C%EB%B9%84%EC%8A%A4-Wherewatch-4Coverflowor-Carousel-%EA%B5%AC%ED%98%84%EA%B8%B0)
