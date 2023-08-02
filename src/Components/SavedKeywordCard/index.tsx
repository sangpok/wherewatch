/** React 관련 */
import React, { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";

/** Icon */
import { HistoryIcon } from "@Icons/index";

/** Animation */
import { motion } from "framer-motion";

const whileTapProp = { scale: 0.9 };

/** Type */
import { KeywordHistory } from "@Types/index";

type SavedKeywordCardProp = {
  allowsSavingKeyword: boolean;
  history: KeywordHistory[];
  recommendItems: Array<{ type: string; id: number; name: string }>;
  onSubmit: (query: string) => void;
  onToggleSaving: () => void;
};

const SavedKeywordCard = ({
  allowsSavingKeyword,
  history,
  recommendItems,
  onSubmit,
  onToggleSaving,
}: SavedKeywordCardProp) => {
  const couldShowHistory = useMemo(
    () => allowsSavingKeyword && history.length !== 0,
    [allowsSavingKeyword, history],
  );

  const allowSavingButNoHistory = useMemo(
    () => allowsSavingKeyword && history.length === 0,
    [allowsSavingKeyword, history],
  );

  const returnHistoryDate = useCallback(
    (date: string) =>
      `${(new Date(date).getUTCMonth() + 1)
        .toString()
        .padStart(2, "0")}. ${new Date(date)
        .getUTCDate()
        .toString()
        .padStart(2, "0")}.`,
    [],
  );

  return (
    <motion.div>
      {couldShowHistory && (
        <div>
          <p className="text-[3.33vw]">최근 검색한 키워드</p>
          <ul>
            {history.map(({ keyword, date }, index) => (
              <motion.li
                whileTap={whileTapProp}
                className="flex flex-row place-content-center place-items-center gap-[2.22vw] px-[4.44vw] py-[3.33vw]"
                key={index}
                onClick={() => onSubmit(keyword)}
              >
                <HistoryIcon width="4.88" height="4.88" />
                <p className="flex-1 text-[4.44vw] font-medium">{keyword}</p>
                <p className="text-[3.33vw]">{returnHistoryDate(date)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {!couldShowHistory && (
        <div className="flex h-[41.66vw] w-full flex-col place-content-center place-items-center rounded-[1.11vw] border border-[#F5F5F5]">
          <p className=" text-[3.88vw] font-light text-[#999]">
            {allowSavingButNoHistory && "최근 검색한 내역이 없습니다."}
            {!allowsSavingKeyword && "검색어 저장 기능이 꺼져 있습니다."}
          </p>

          <div className=" text-[3.33vw] font-light text-[#999]">
            <span>추천 키워드: </span>
            {recommendItems.map((item, index) => (
              <React.Fragment key={index}>
                {!!index && ", "}
                <NavLink
                  className="text-[#51AFE3] underline"
                  to={`/${item.type}/${item.id}`}
                >
                  {item.name}
                </NavLink>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <p onClick={() => onToggleSaving()}>
        {allowsSavingKeyword ? "자동저장 끄기" : "자동저장 켜기"}
      </p>
    </motion.div>
  );
};

const MemoedSavedKeywordCard = React.memo(SavedKeywordCard);

export default MemoedSavedKeywordCard;
