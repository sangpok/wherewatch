import { useCallback, useEffect, useState } from "react";

const PREFIX = "wherewatch-";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = localStorage.getItem(PREFIX + key);

    if (!item) {
      localStorage.setItem(PREFIX + key, JSON.stringify(defaultValue));
    }

    setValue(item ? (JSON.parse(item) as T) : defaultValue);

    function handler(e: StorageEvent) {
      if (e.key !== PREFIX + key) return;

      const lsi = localStorage.getItem(PREFIX + key);
      setValue(JSON.parse(lsi ?? "") as T);
    }

    window.addEventListener("storage", handler);

    return () => window.removeEventListener("storage", handler);
  }, []);

  const setValueWrap = useCallback(
    (value: T) => {
      try {
        setValue(value);

        localStorage.setItem(PREFIX + key, JSON.stringify(value));

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new StorageEvent("storage", { key: PREFIX + key }),
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    [key, localStorage],
  );

  return [value, setValueWrap];
}
