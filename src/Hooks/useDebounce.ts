import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerInstance = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerInstance);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
