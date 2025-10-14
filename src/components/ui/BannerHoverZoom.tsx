"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  /** Image URL */
  src: string;
  /** Height of the banner under the nav */
  bannerHeight?: number; // px
  /** Delay before zoom appears (ms) */
  delayMs?: number;
  /** Distance from top of screen to place zoom (px). Set to your navbar height */
  headerOffset?: number;
  /** Rounded radius class for banner */
  radiusClass?: string;
};

export default function BannerHoverZoom({
  src,
  bannerHeight = 180,
  delayMs = 3000,
  headerOffset = 64,
  radiusClass = "rounded-2xl",
}: Props) {
  const [showZoom, setShowZoom] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const handleEnter = () => {
    timerRef.current = window.setTimeout(() => setShowZoom(true), delayMs);
  };

  const clearAll = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setShowZoom(false);
  };

  return (
    <>
      {/* Banner under nav */}
      <div
        className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        onMouseEnter={handleEnter}
        onMouseLeave={clearAll}
        onFocus={handleEnter}
        onBlur={clearAll}
      >
        <div
          className={`mt-4 overflow-hidden border bg-white shadow-sm dark:bg-black/40 dark:border-gray-700 border-gray-200 ${radiusClass}`}
          style={{ height: bannerHeight }}
        >
          <img
            src={src}
            alt="Featured banner"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Zoom (image only) */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            key="top-zoom"
            className="fixed left-0 right-0 z-[70] pointer-events-none flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ top: headerOffset }}
          >
            <motion.img
              src={src}
              alt="Zoom preview"
              className="max-w-[92vw] max-h-[50vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, duration: 0.35 }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
