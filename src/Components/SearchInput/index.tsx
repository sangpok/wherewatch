import { CloseIcon, SearchIcon } from "@Icons/index";
import React, { MouseEventHandler, useCallback, useRef } from "react";

import { motion } from "framer-motion";

type SearchModeExitProp = {
  className: string;
  onClick: () => void;
};

const SearchModeExit = React.memo(
  ({ className, onClick }: SearchModeExitProp) => {
    return (
      <motion.div layout className={className} onClick={onClick}>
        <CloseIcon />
      </motion.div>
    );
  },
  // (prevProp, nextProp) => prevProp.className === nextProp.className,
);

type SearchInputProp = {
  isSearchMode: boolean;
  keyword: string;
  onChange: (keyword: string) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  onBlur: () => void;
  onSubmit: (query: string) => void;
};

const SearchInput = ({
  isSearchMode,
  keyword,
  onChange,
  onClick,
  onBlur,
  onSubmit,
}: SearchInputProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (inputRef.current === null) return;

      inputRef.current.blur();
      onSubmit(keyword);
    },
    [keyword],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [],
  );

  return (
    <div className=" relative flex w-full items-center gap-[2.22vw] ">
      <motion.form
        layout
        className="z-10 flex w-full flex-row items-center bg-white"
        onSubmit={handleSubmit}
      >
        <div
          onClick={onClick}
          className="flex w-full items-center gap-[2.22vw] rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] p-[2.22vw]"
        >
          <input
            ref={inputRef}
            className=" w-full flex-1 appearance-none  text-[4.44vw] outline-none"
            type="text"
            placeholder="궁금하신 작품을 검색해보세요✨"
            value={keyword}
            onChange={handleChange}
          />
          {/* <CircleClose width="5.56" height="5.56" /> */}
          <div>
            <SearchIcon />
          </div>
        </div>
      </motion.form>

      <SearchModeExit
        className={
          isSearchMode ? "z-0" : " absolute right-0 top-0 -z-10 mt-[2.22vw]"
        }
        onClick={onBlur}
      />
    </div>
  );
};

export default SearchInput;
