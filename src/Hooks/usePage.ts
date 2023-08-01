import { useCallback, useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(1);

  const nextPage = useCallback(() => setPage((prevPage) => prevPage + 1), []);

  return [page, nextPage];
};

export default usePage;
