/** React 관련 */
import React, { useCallback, useState } from "react";

/** Type */
import type { TMDBPlatform, TMDBProviderType } from "@Types/index";

const getProvideTypeName = (provideType: TMDBProviderType) => {
  const nameMap = {
    flatrate: "요금제",
    rent: "대여",
    buy: "구매",
    free: "무료",
  };

  return nameMap[provideType];
};

type ProviderTabProp = {
  tabs: string[];
  contents: Array<TMDBPlatform[]>;
};

const ProviderTab = ({ tabs, contents }: ProviderTabProp) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleTabClick = useCallback(
    (index: number) => setSelectedId(index),
    [],
  );

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-fit select-none flex-row rounded-[1.11vw] border-[0.27vw]  border-[#F5F5F5]">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`px-[4.44vw] py-[3.33vw] text-[4.44vw] ${
              index === selectedId
                ? "bg-[#F5F5F5] font-semibold"
                : "font-medium"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {getProvideTypeName(tab as TMDBProviderType)}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col rounded-[1.11vw] border-[0.27vw] border-[#F5F5F5] p-[4.44vw]">
        {contents.length !== 0 &&
          contents[selectedId].map(({ icon, name }, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-[3.33vw] py-[1.11vw] "
            >
              <img
                className="rounded-full"
                src={`http://image.tmdb.org/t/p/w45${icon}`}
              />
              <p className=" font-medium">{name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const MemoedProviderTab = React.memo(ProviderTab);

export default MemoedProviderTab;
