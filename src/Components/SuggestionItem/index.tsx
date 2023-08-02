/** React 관련 */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** Component */
import SuggestionBase from "./SuggestionBase";

/** Animation */
import { motion } from "framer-motion";

const whileTapProp = { scale: 0.9 };

/** Type */
import type { TMDBContent } from "@Types/index";
import type { SuggestionBaseProp } from "./SuggestionBase";

/** Util */
import {
  getAdditionalElement,
  getDescriptions,
  getThumbnailSrc,
  getTitle,
} from "@Lib/tmdb";

type SuggestionItemProp = {
  type?: "default" | "group";
  contentType: string;
  id: number;
  groupChildren?: Array<TMDBContent>;
} & SuggestionBaseProp;

const SuggestionItem = React.memo(
  ({
    type = "default",
    contentType,
    id,
    thumbnail,
    title,
    descriptions,
    additionalElement,
    highlightKeyword = "",
    groupChildren,
  }: SuggestionItemProp) => {
    const navigate = useNavigate();

    const handleTap = useCallback(() => navigate(`/${contentType}/${id}`), []);
    const handleTapWithPerson = useCallback(
      () => navigate(`/person/${id}`),
      [],
    );

    const SuggestionItemDefault = (
      <motion.div
        data-item-id={id}
        // variants={animationVariant}
        whileTap={whileTapProp}
        className="rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] p-[3.33vw]"
        onTap={handleTap}
      >
        <SuggestionBase
          thumbnail={thumbnail}
          title={title}
          highlightKeyword={highlightKeyword}
          descriptions={descriptions}
          additionalElement={additionalElement}
        />
      </motion.div>
    );

    const SuggestionItemGroup = (
      <motion.div
        // variants={animationVariant}
        className=" rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] py-[3.33vw]"
      >
        <motion.div
          data-item-id={id}
          whileTap={whileTapProp}
          className=" mx-[3.33vw] mb-[2.77vw] flex flex-row items-center space-x-[2.77vw]"
          onTap={handleTapWithPerson}
        >
          <SuggestionBase
            thumbnail={thumbnail}
            title={title}
            highlightKeyword={highlightKeyword}
            descriptions={descriptions}
            additionalElement={additionalElement}
          />
        </motion.div>

        <div className=" bg-[#f5f5f5] py-[2.22vw]">
          {groupChildren &&
            groupChildren.map((child) => (
              <motion.div
                key={child.id}
                data-item-id={child.id}
                whileTap={whileTapProp}
                className=" mx-[3.33vw] flex flex-row items-center space-x-[2.77vw] py-[2.22vw]"
                onTap={() => navigate(`/${child.media_type}/${child.id}`)}
              >
                <SuggestionBase
                  thumbnail={getThumbnailSrc(child)}
                  title={getTitle(child)}
                  descriptions={getDescriptions(child)}
                  additionalElement={getAdditionalElement(child)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    );

    return type === "default" ? SuggestionItemDefault : SuggestionItemGroup;
  },
);

const MemoedSuggestionItem = React.memo(
  SuggestionItem,
  (prevProp, nextProp) =>
    prevProp.id === nextProp.id &&
    prevProp.highlightKeyword === nextProp.highlightKeyword,
);

export default MemoedSuggestionItem;
