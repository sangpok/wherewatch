import React from "react";

const Dot = React.memo(() => (
  <div className=" inline-block aspect-square h-[0.83vw] max-h-[0.83vw] min-h-[0.83vw] w-[0.83vw] min-w-[0.83vw] max-w-[0.83vw]  rounded-full bg-[#999]" />
));

type StyledText = {
  children: React.ReactNode;
};

const StyledText = React.memo(({ children }: StyledText) => (
  <span className="line-clamp-1 text-[3.33vw] leading-none text-[#999]">
    {children}
  </span>
));

type JoinedTextProp = {
  textList: Array<string>;
};

const JoinedText = ({ textList }: JoinedTextProp) => {
  return (
    <div className="flex items-center space-x-[1.11vw]">
      {textList &&
        textList.slice(0, 3).map((text, index) => {
          return (
            <React.Fragment key={index}>
              {!!index && <Dot />}
              <StyledText>{text}</StyledText>
            </React.Fragment>
          );
        })}
    </div>
  );
};

const MemoedJoinedText = React.memo(
  JoinedText,
  (prevProp, nextProp) => prevProp.textList.length === nextProp.textList.length,
);

export default MemoedJoinedText;
