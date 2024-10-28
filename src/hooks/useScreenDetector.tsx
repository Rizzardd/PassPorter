"use client";

import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState<number | null>(null);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width !== null && width <= 768;
  const isTablet = width !== null && width <= 1024;
  const isDesktop = width !== null && width > 1024;

  return { isMobile, isTablet, isDesktop };
};
