/** React  */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

/** Component */
import SearchInput from "@Components/SearchInput";
import Wherewatch from "@Components/Wherewatch";

/** View */
import LandingView from "@Views/LandingView";
const SearchModeView = React.lazy(() => import("@Views/SearchModeView"));
const SearchResultView = React.lazy(() => import("@Views/SearchResultView"));

/** Animation */
import { defaultAnimation } from "@Animation/index.ts";
import { AnimatePresence, motion } from "framer-motion";

const initialAnimationProp = { gap: "3.33vw" };
const transitionAnimationProp = { type: "tween" };

/** API */
import { getSuggestions } from "@API/index.ts";
import { useQuery } from "react-query";

/** Hook */
import useDebounce from "@Hooks/useDebounce";
import useLocalStorage from "@Hooks/useLocalStorage";

/** Type */
import type {
  KeywordHistory,
  TMDBContent,
  TMDBResponse,
} from "@Types/index.ts";

type LinkedWherewatchProp = {
  smallType: boolean;
  onClick: () => void;
};

const LinkedWherewatch = React.memo(
  ({ smallType, onClick }: LinkedWherewatchProp) => {
    return (
      <NavLink to="/" onClick={onClick}>
        <Wherewatch smallType={smallType} />
      </NavLink>
    );
  },
  (prevProp, nextProp) => prevProp.smallType === nextProp.smallType,
);

type SearchHeaderProp = {
  gap: string;
  isSearchMode: boolean;
  onWherewatchClick: () => void;
  keyword: string;
  onChange: (keyword: string) => void;
  onClick: (event: React.MouseEvent) => void;
  onBlur: () => void;
  onSubmit: (query: string) => void;
};

const SearchHeader = React.memo(
  ({
    gap,
    isSearchMode,
    onWherewatchClick,
    keyword,
    onChange,
    onClick,
    onBlur,
    onSubmit,
  }: SearchHeaderProp) => {
    const animateProp = useMemo(() => ({ gap }), [gap]);

    return (
      <motion.div
        className=" flex flex-col"
        layout
        initial={initialAnimationProp}
        animate={animateProp}
        transition={transitionAnimationProp}
      >
        <LinkedWherewatch
          smallType={isSearchMode}
          onClick={onWherewatchClick}
        />

        <SearchInput
          isSearchMode={isSearchMode}
          keyword={keyword}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          onSubmit={onSubmit}
        />
      </motion.div>
    );
  },
);

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce<string>(keyword, 100);

  const [keywordHistory, setKeywordHistory] = useLocalStorage<KeywordHistory[]>(
    "keyword-history",
    [],
  );

  const [allowsSavingKeyword, setAllowsSavingKeyword] =
    useLocalStorage<boolean>("allows-saving-keyword", true);

  const { isSuccess, data: suggestionsRaw } = useQuery<
    TMDBResponse<TMDBContent>
  >(["search", debouncedKeyword], () => getSuggestions(debouncedKeyword, 1));

  const [suggestions, setSuggestions] = useState<TMDBContent[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  useEffect(() => {
    if (!isSuccess) return;
    if (!suggestionsRaw) return;

    setSuggestions(suggestionsRaw.results);
  }, [suggestionsRaw]);

  useEffect(() => {
    setKeyword(new URLSearchParams(location.search).get("query") || "");
  }, [location]);

  const getRouteKey = useCallback((pathname: string) => {
    if (pathname === "/") return "landing";
    if (pathname === "/search") return "search";
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setIsSearchMode(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsSearchMode(false);
  }, []);

  const handleSubmit = useCallback(
    (query: string) => {
      setIsSearchMode(false);

      const keywordIndex = keywordHistory.findIndex(
        ({ keyword }) => keyword === query,
      );

      if (keywordIndex >= 0) {
        setKeywordHistory([
          { keyword: query, date: new Date().toString() },
          ...keywordHistory.filter((_, index) => index !== keywordIndex),
        ]);
      } else {
        if (keywordHistory.length >= 10) {
          setKeywordHistory([
            { keyword: query, date: new Date().toString() },
            ...keywordHistory.slice(0, 9),
          ]);
        } else {
          setKeywordHistory([
            { keyword: query, date: new Date().toString() },
            ...keywordHistory,
          ]);
        }
      }

      navigate(`/search?query=${query}`);
    },
    [debouncedKeyword, keywordHistory],
  );

  const handleChange = useCallback((keyword: string) => {
    setKeyword(keyword);
  }, []);

  const handleWherewatchClick = useCallback(() => {
    setIsSearchMode(false);
    navigate("/");
  }, []);

  const handleToggleSaving = useCallback(
    () => setAllowsSavingKeyword(!allowsSavingKeyword),
    [allowsSavingKeyword],
  );

  const routerKey = useMemo(
    () => getRouteKey(location.pathname),
    [location.pathname],
  );

  const searchHeaderGap = useMemo(
    () => (isSearchMode ? "0" : "3.33vw"),
    [isSearchMode],
  );

  return (
    <motion.div
      {...defaultAnimationProp}
      className="mx-[3.33vw] my-[6.66vw] overflow-x-hidden will-change-transform"
    >
      <SearchHeader
        gap={searchHeaderGap}
        isSearchMode={isSearchMode}
        keyword={keyword}
        onWherewatchClick={handleWherewatchClick}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />

      <main>
        <AnimatePresence initial={false} mode="wait">
          {isSearchMode && (
            <SearchModeView
              key="searchmode"
              suggestions={suggestions}
              keyword={debouncedKeyword}
              allowsSavingKeyword={allowsSavingKeyword}
              onToggleSaving={handleToggleSaving}
              keywordHisory={keywordHistory}
              isSuccess={isSuccess}
              onSubmit={handleSubmit}
            />
          )}

          {!isSearchMode && (
            <Routes location={location} key={routerKey}>
              <Route index element={<LandingView />} />
              <Route path="search" element={<SearchResultView />} />
            </Routes>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

const MemoedRootLayout = React.memo(RootLayout);

export default MemoedRootLayout;
