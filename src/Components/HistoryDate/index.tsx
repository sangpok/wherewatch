import { HistoryIcon } from "@Icons/index";
import React from "react";

type HistoryDateProp = {
  date: string;
};

const HistoryDate = ({ date }: HistoryDateProp) => {
  return (
    <div className="flex select-none items-center space-x-[0.55vw]">
      <HistoryIcon width="5.00" height="5.00" />
      <span className=" text-[3.88vw] text-[#999]">{date}</span>
    </div>
  );
};

const MemoedHistoryDate = React.memo(HistoryDate);

export default MemoedHistoryDate;
