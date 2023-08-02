/** React 관련 */
import React, { useCallback, useEffect, useRef, useState } from "react";

/** Hook */
import useIntersectionObserver from "@Hooks/useIntersectionObserver";

type LazyImageProp = {
  src: string;
  alt: string;
};

const LazyImage = ({ src, alt }: LazyImageProp) => {
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
    <div ref={imgRef}>
      {isObserved && <img src={src} loading="lazy" alt={alt} />}
    </div>
  );
};

const MemoedLazyImage = React.memo(LazyImage);

export default MemoedLazyImage;
