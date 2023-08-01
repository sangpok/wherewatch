import useIntersectionObserver from "@Hooks/useIntersectionObserver";
import React, { useCallback, useEffect, useRef, useState } from "react";

type LazyImageProp = {
  src: string;
};

const LazyImage = ({ src }: LazyImageProp) => {
  const imgRef = useRef<HTMLDivElement>(null);

  const [observe, unobserve] = useIntersectionObserver(
    useCallback(() => {
      setIsObserved(true);
      unobserve(imgRef.current!);
    }, []),
  );

  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    observe(imgRef.current!);
  }, []);

  return (
    <div ref={imgRef}>{isObserved && <img src={src} loading="lazy" />}</div>
  );
};

const MemoedLazyImage = React.memo(LazyImage);

export default MemoedLazyImage;
