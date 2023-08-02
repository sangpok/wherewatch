/** React 관련 */
import React, { useCallback, useRef, useState } from "react";

type FadedImageProp = {
  src?: string | null;
  squareRatio?: boolean;
};

const FadedImage = ({ src, squareRatio = false }: FadedImageProp) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoadCompleted, setIsLoadCompleted] = useState(false);

  const handleLoad = useCallback(() => {
    if (imgRef.current === null) return;

    if (imgRef.current.complete) {
      setIsLoadCompleted(true);
    }
  }, [imgRef]);

  return (
    <div
      className={`relative bg-gray-500 ${squareRatio ? "aspect-square" : ""}`}
    >
      {src && (
        <img
          ref={imgRef}
          className={` ${
            squareRatio ? "aspect-square" : ""
          }  h-auto w-full object-cover ${
            isLoadCompleted ? "" : "animate-pulse bg-[#EAEAEA]"
          }`}
          src={src}
          onLoad={handleLoad}
          loading="lazy"
          alt=""
        />
      )}
      <div className=" absolute left-[-0.27vw] top-0 h-[calc(100%+0.27vw)] w-[calc(100%+0.54vw)] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
};

const MemoedFadedImage = React.memo(FadedImage);

export default MemoedFadedImage;
