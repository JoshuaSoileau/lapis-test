import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const breakpoints = {
  xs: "(min-width: 0px)",
  sm: "(min-width: 0px)",
  md: "(min-width: 768px)",
  mdm: "(min-width: 768px)",
  lg: "(min-width: 1280px)",
  xl: "(min-width: 1280px)",
};

const getDefaultState = () => {
  const state = {};

  Object.entries(breakpoints).forEach(([size, query]) => {
    const sizeCapitalized = size.charAt(0).toUpperCase() + size.slice(1);
    if (typeof window === "undefined") {
      state[`is${sizeCapitalized}`] = size === "lg" || size === "xl";
    } else {
      const { matches } = window.matchMedia(query);
      state[`is${sizeCapitalized}`] = matches;
    }
  });

  return state;
};

const useMediaHook = () => {
  const [bpStates, setBpStates] = useState(() => getDefaultState());

  const getMatchedStates = () => {
    if (!window) return getDefaultState();
    const state = {};

    Object.entries(breakpoints).forEach(([size, query]) => {
      const { matches } = window.matchMedia(query);
      const sizeCapitalized = size.charAt(0).toUpperCase() + size.slice(1);

      state[`is${sizeCapitalized}`] = matches;
    });

    return state;
  };

  const handleResize = () => {
    const newState = getMatchedStates();
    setBpStates(newState);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return [bpStates];
};

const MediaContext = createContext(null);

export const MediaProvider = ({ children }) => {
  const value = useMediaHook();

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};

MediaProvider.defaultProps = {
  children: "",
};

export const useMedia = () => {
  const context = useContext(MediaContext);

  if (context === undefined || context === null) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};

export const useMediaValue = (config) => {
  if (!config || !Object.keys(config).length) return null;
  const [Media] = useMedia();

  switch (true) {
    case Media.isLg:
      return config.lg || config.md || config.default || null;
    case Media.isMd:
      return config.md || config.default || null;
    default:
      return config.default || null;
  }
};

export default {
  MediaProvider,
  useMedia,
  useMediaValue,
};
