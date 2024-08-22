"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useEventListener, useIsClient } from "usehooks-ts";

// const videoSample =
//   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const videoSample =
  "https://player.vimeo.com/video/988766524?h=309566108d&title=0&byline=0&portrait=0&autopause=0&controls=0&loop=1&app_id=122963";

const VideoFullScreenReactPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const doc = typeof document !== "undefined" ? document : null;
  const documentRef = useRef<Document>(doc);
  const isClient = useIsClient();
  const [isVideoReady, setVideoReady] = useState(false);

  useEventListener(
    "visibilitychange",
    () => {
      if (documentRef.current) {
        setIsPlaying(!documentRef.current.hidden);
        console.log(screen);
      }
    },
    documentRef
  );

  // useEffect(() => {
  //   if (typeof document === "undefined") return;

  //   const onVisibilityChange = () => {
  //     setIsPlaying(!document.hidden);
  //   };

  //   document.addEventListener("visibilitychange", onVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", onVisibilityChange);
  //   };
  // }, []);

  return (
    <div>
      <div
        className={clsx(
          "relative z-0 w-full h-screen overflow-hidden transition-opacity duration-500 cursor-pointer",
          isVideoReady ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isClient && (
          <ReactPlayer
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !h-[56.25vw] aspect-video !w-[177.78vh] !min-w-[100vw] !min-h-[100vh] pointer-events-none"
            url={videoSample}
            playing={isPlaying}
            width="100%"
            height="100%"
            onReady={() => {
              setVideoReady(true);
            }}
          />
        )}
        <button
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-2.5 px-5 transition-opacity duration-500",
            isPlaying ? "opacity-0" : "opacity-100"
          )}
        >
          Play video
        </button>
      </div>
    </div>
  );
};

export default VideoFullScreenReactPlayer;
