/** React */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Component */
import ContentCard from "@Components/ContentCard";
import SearchResultViewSkeleton from "./SearchResultView.skeleton";

/** Icon */
import { SyncLoader } from "react-spinners";

/** Animation */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** API */
import { getSuggestions } from "@API/index";
import { useQuery } from "react-query";

/** Type */
import { TMDBContent, TMDBResponse } from "@Types/index";

/** Hook */
import useIntersectionObserver from "@Hooks/useIntersectionObserver";

const SearchResultView = () => {
  /** Route 관련 */
  const navigate = useNavigate();
  const location = useLocation();
  const { search: queryString } = location;

  /** Query String 관련 */
  const [query, setQuery] = useState(
    new URLSearchParams(queryString).get("query"),
  );

  /** Content Item 관련 */
  const [loadedResults, setLoadedResults] = useState<TMDBContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = useRef(1);

  /** Fetching */
  const {
    isSuccess,
    isLoading,
    data: searchResults,
  } = useQuery<TMDBResponse<TMDBContent>>(
    ["search", { query, currentPage }],
    () => getSuggestions(query, currentPage),
  );

  /** 무한 스크롤 관련 */
  const listendRef = useRef<HTMLDivElement>(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    if (currentPage >= maxPage.current) return;

    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  });

  /**
   * Response Cache 관련
   *
   * 경로는 같으나 SearchMode에 따라 컴포넌트가 마운트/언마운트가 진행되므로 Fetching이 진행되는데,
   * cache key인 query와 currentPage가 각각 업데이트 되어 2번 호출이 됨.
   * 이를 방지하고자 만든 Response Cache임.
   * */
  const responseCacheSet = useMemo(() => new Set<string>(), []);

  const validateResponseKey = useCallback(
    (responseKey: string) => {
      if (responseCacheSet.has(responseKey)) {
        return false;
      }

      responseCacheSet.add(responseKey);

      return true;
    },
    [responseCacheSet],
  );

  useEffect(() => {
    if (!(searchResults && query)) return;

    const responseKey = `${query}-${currentPage}`;

    if (!validateResponseKey(responseKey)) {
      return;
    }

    setLoadedResults(
      (prevResults) =>
        [...prevResults, ...searchResults.results] as TMDBContent[],
    );

    maxPage.current = searchResults?.total_pages || 1;
  }, [isSuccess]);

  useEffect(() => {
    if (!listendRef.current) return;

    if (isLoading || currentPage >= maxPage.current) {
      unobserve(listendRef.current);
    } else {
      observe(listendRef.current);
    }
  }, [isLoading]);

  useEffect(() => {
    const newQuery = new URLSearchParams(queryString).get("query");

    // Invalid Query Checking
    if (!newQuery || newQuery === "") {
      navigate("/");
      return;
    }

    // if it is new Query
    if (newQuery !== query) {
      setLoadedResults([]);
      setCurrentPage(1);
      setQuery(newQuery);
    }
  }, [location]);

  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  if (isLoading) {
    return <SearchResultViewSkeleton />;
  }

  return (
    <motion.div {...defaultAnimationProp} className="mt-[6.66vw]">
      {isSuccess && (
        <p className=" mb-[3.33vw] text-[3.88vw]">
          <strong>{query}</strong>에 대한{" "}
          <strong>{searchResults?.total_results || "0"}건</strong>의 검색 결과
        </p>
      )}

      {isSuccess && loadedResults.length === 0 && (
        <p>검색 결과가 존재하지 않아요😢</p>
      )}

      <div className=" grid grid-cols-2 gap-[4.44vw]">
        {loadedResults.map((result, index) => {
          const { id, media_type } = result;

          return (
            <ContentCard
              key={`${id}-${index}`}
              mediaType={media_type}
              contentDetail={result}
              onTap={() => navigate(`/${media_type}/${id}`)}
              cardType="medium"
            />
          );
        })}
      </div>

      {isLoading && (
        <motion.div className="absolute bottom-[10vw] flex w-full items-center justify-center">
          <SyncLoader />
        </motion.div>
      )}

      {/* 페이지 끝을 알리는 Element. 무한 스크롤를 위함 */}
      <div
        ref={listendRef}
        className="list-end pointer-events-none absolute bottom-0 h-[138.88vw] w-full select-none appearance-none bg-transparent outline-none"
      />
    </motion.div>
  );
};

const MemoedSearchResultView = React.memo(SearchResultView);

export default MemoedSearchResultView;
