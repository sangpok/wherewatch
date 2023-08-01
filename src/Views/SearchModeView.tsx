import React from "react";

/** Component 관련 */
import SavedKeywordCard from "@Components/SavedKeywordCard";
import SuggestionItem from "@Components/SuggestionItem";

/** Animation 관련 */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** Type 관련 */
import { KeywordHistory, TMDBContent } from "@Types/index";

/** Util 관련 */
import {
  getAdditionalElement,
  getDescriptions,
  getSuggestionItemType,
  getThumbnailSrc,
  getTitle,
} from "@Lib/tmdb";

type SearchModeProp = {
  suggestions: Array<TMDBContent>;
  keyword: string;
  allowsSavingKeyword: boolean;
  keywordHisory: KeywordHistory[];
  isSuccess: boolean;
  onSubmit: (query: string) => void;
  onToggleSaving: () => void;
};

const SearchModeView = ({
  suggestions,
  keyword,
  allowsSavingKeyword,
  keywordHisory,
  isSuccess,
  onSubmit,
  onToggleSaving,
}: SearchModeProp) => {
  const couldShowKeywordHistory = keyword === "" && suggestions.length === 0;
  const isNoResult = isSuccess && keyword !== "" && suggestions.length === 0;

  return (
    <motion.div
      {...defaultAnimation}
      className="mt-[3.33vw] select-none space-y-[3.33vw]"
    >
      {/* <AnimatePresence> */}
      {couldShowKeywordHistory && (
        <SavedKeywordCard
          key="savedkeywordcard"
          allowsSavingKeyword={allowsSavingKeyword}
          history={keywordHisory}
          recommendItems={[
            {
              type: "tv",
              id: 123,
              name: "허허",
            },
            {
              type: "tv",
              id: 123,
              name: "허허",
            },
          ]}
          onSubmit={onSubmit}
          onToggleSaving={onToggleSaving}
        />
      )}
      {/* </AnimatePresence> */}

      {isNoResult && (
        <span>
          <strong>{keyword}</strong>에 대한 검색결과가 존재하지 않아요😢
        </span>
      )}

      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={suggestion.id}
          id={suggestion.id}
          type={getSuggestionItemType(suggestion)}
          contentType={suggestion.media_type}
          thumbnail={getThumbnailSrc(suggestion)}
          title={getTitle(suggestion)}
          highlightKeyword={keyword}
          descriptions={getDescriptions(suggestion)}
          additionalElement={getAdditionalElement(suggestion)}
          groupChildren={suggestion.known_for}
        />
      ))}
    </motion.div>
  );
};

const MemoedSearchModeView = React.memo(SearchModeView);

export default MemoedSearchModeView;
