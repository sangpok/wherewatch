import JoinedText from "@Components/JoinedText";
import LazyImage from "@Components/LazyImage";
import React, { ComponentProps } from "react";

const Mark = React.memo(({ children }: ComponentProps<"span">) => (
  <mark className="bg-transparent text-[#939600]">{children}</mark>
));

type SuggestionBaseProp = {
  thumbnail: string;
  title: string;
  descriptions: Array<string>;
  additionalElement?: React.ReactNode | JSX.Element;
  highlightKeyword?: string;
};

const SuggestionBase = ({
  thumbnail,
  title,
  descriptions,
  additionalElement = null,
  highlightKeyword = "",
}: SuggestionBaseProp) => {
  return (
    <div className=" flex w-full flex-row items-center space-x-[2.77vw]">
      <div className="aspect-square w-[8.88vw] overflow-hidden rounded-full bg-gray-500 object-cover">
        {thumbnail && (
          // <img src={thumbnail} loading="lazy" width="100px" height="100px" />
          <LazyImage src={thumbnail} />
        )}
      </div>

      <div className="flex-1 space-y-[1.11vw]">
        <p className="line-clamp-1 text-[4.44vw] font-medium leading-none">
          {highlightKeyword ? (
            <>
              {title.indexOf(highlightKeyword) >= 0 ? (
                <>
                  {title.substring(0, title.indexOf(highlightKeyword))}
                  <Mark>{highlightKeyword}</Mark>
                  {title.substring(
                    title.indexOf(highlightKeyword) + highlightKeyword.length,
                  )}
                </>
              ) : (
                title
              )}
            </>
          ) : (
            title
          )}
        </p>

        <JoinedText textList={descriptions} />
      </div>

      {additionalElement}
    </div>
  );
};

const MemoedSuggestionBase = React.memo(
  SuggestionBase,
  (prevProps, nextProp) =>
    prevProps.title === nextProp.title &&
    prevProps.highlightKeyword === nextProp.highlightKeyword,
);

export default MemoedSuggestionBase;

export type { SuggestionBaseProp };
