import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import debounce from "lodash/debounce";

// pokud je k dispozici nativní observer, rádi ho využijeme
const ResizeObserver =
  typeof window !== "undefined"
    ? window.ResizeObserver || ResizeObserverPolyfill
    : ResizeObserverPolyfill;

export const maxWidthMobileSmall = 359;
export const minWidthMobileMedium = maxWidthMobileSmall + 1; // 360
export const maxWidthMobileMedium = 479;
export const minWidthMobileLarge = maxWidthMobileMedium + 1; // 480
export const maxWidthMobileLarge = 591;
export const minWidthTablet = maxWidthMobileLarge + 1; // 592
export const maxWidthTablet = 767;
export const minWidthDesktop = maxWidthTablet + 1; // 768
export const maxWidthMediumDesktop = 937;
export const minWidthLargeDesktop = maxWidthMediumDesktop + 1; // 938
export const minWidthLargestDesktop = 1136;

export interface ResponsiveContextValues {
  ref?: RefObject<HTMLElement>;
  wasHydrated?: boolean;
}

export const ResponsiveContext = createContext<ResponsiveContextValues>({});

export const useResponsiveContext = () => useContext(ResponsiveContext);

export const ResponsiveContextProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: ResponsiveContextValues }>) => {
  return (
    <ResponsiveContext.Provider value={{ ...useResponsiveContext(), ...value }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export interface MediaQuery {
  maxWidth?: number;
  minWidth?: number;
  query?: string;
}

export const buildMediaQuery = ({
  maxWidth,
  minWidth,
  query,
  useScreen = true,
}: MediaQuery & {
  useScreen?: boolean;
}): string => {
  let mediaQuery = useScreen ? "@media screen" : "";
  if (typeof minWidth !== "undefined") {
    mediaQuery += `${useScreen ? " and " : ""}(min-width: ${minWidth}px)`;
  }
  if (typeof maxWidth !== "undefined") {
    mediaQuery += `${useScreen ? " and " : ""}(max-width: ${maxWidth}px)`;
  }
  if (typeof query !== "undefined") {
    mediaQuery += `${mediaQuery.length > 0 ? " and " : ""}${query}`;
  }
  return mediaQuery;
};

const useStyles = createUseStyles({
  mobile: {
    [buildMediaQuery({ minWidth: minWidthDesktop })]: {
      display: "none",
    },
  },
  desktop: {
    [buildMediaQuery({ maxWidth: maxWidthTablet })]: {
      display: "none",
    },
  },
});

export const useMediaQuery = (
  query: MediaQuery,
  ref?: RefObject<HTMLElement>
): boolean => {
  const mediaQueryList = useRef<MediaQueryList | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const { ref: contextRef, wasHydrated = false } = useResponsiveContext();

  const usedRef = !query.query ? ref || contextRef : undefined;

  const resizeHandler = useCallback(
    ({ width }: { width: number }) => {
      const minWidth = query.minWidth || 0;
      const maxWidth = query.maxWidth || Infinity;

      return width >= minWidth && width <= maxWidth;
    },
    [query.maxWidth, query.minWidth]
  );

  let defaultMatch = false;

  // obsah už byl zhydratován takže můžeme detekovat defaultní hodnoty pro martch
  // a nemusí nás zajímat rozdíl mezi ssr a klientem
  if (wasHydrated) {
    if (!usedRef) {
      mediaQueryList.current = window.matchMedia(
        buildMediaQuery(query).replace("@media ", "")
      );
      defaultMatch = mediaQueryList.current.matches;
    } else {
      defaultMatch = usedRef.current
        ? resizeHandler({
            width: usedRef.current.getBoundingClientRect().width,
          })
        : false;
    }
  }

  const [matches, setMatches] = useState(defaultMatch);

  useEffect(() => {
    // Pokud neni specifikovany referencni element, pouzivame klasicke document media query.
    // V opacnem pripade musime naslouchat na zmenu velikosti elementu

    // defaultní hodnotu nastavujeme v useeffectu, protože by nám jinak dělala problém při hydrataci
    if (!usedRef && typeof window !== "undefined" && window.matchMedia) {
      mediaQueryList.current = window.matchMedia(
        buildMediaQuery(query).replace("@media ", "")
      );
      setMatches(!!mediaQueryList.current?.matches);
    } else if (usedRef?.current) {
      setMatches(
        resizeHandler({ width: usedRef.current.getBoundingClientRect().width })
      );
    }
  }, [query, resizeHandler, usedRef]);

  useEffect(() => {
    let mounted = true;
    if (!usedRef) {
      if (!mediaQueryList.current) {
        return () => {
          mounted = false;
        };
      }

      const changeListener = (e: MediaQueryListEvent) => {
        if (mounted) {
          setMatches(e.matches);
        }
      };
      if (mediaQueryList.current.addEventListener) {
        mediaQueryList.current.addEventListener("change", changeListener);
      } else if (mediaQueryList.current.addListener) {
        mediaQueryList.current.addListener(changeListener);
      }

      return () => {
        mounted = false;
        if (mediaQueryList.current) {
          if (mediaQueryList.current.removeEventListener) {
            mediaQueryList.current.removeEventListener(
              "change",
              changeListener
            );
          } else if (mediaQueryList.current.removeListener) {
            mediaQueryList.current.removeListener(changeListener);
          }
          mediaQueryList.current = null;
        }
      };
    }

    const element = usedRef?.current;
    if (!element) {
      return () => {
        mounted = false;
      };
    }

    // throttle posílal do console errory
    const resizeObserverHandler = debounce((entries: ResizeObserverEntry[]) => {
      entries.forEach((entry) => {
        if (mounted) {
          setMatches(resizeHandler(entry.contentRect));
        }
      });
    }, 100);

    resizeObserver.current = new ResizeObserver(resizeObserverHandler);
    resizeObserver.current.observe(element);

    return () => {
      mounted = false;
      resizeObserver.current?.disconnect();
    };
  }, [resizeHandler, usedRef]);

  return matches;
};

export enum Breakpoint {
  isMaxLargeMobile = "isMaxLargeMobile", // < 591
  isMaxMediumDesktop = "isMaxMediumDesktop", // <937
  isMaxMediumMobile = "isMaxMediumMobile", // < 479
  isMaxSmallMobile = "isMaxSmallMobile", // < 359
  isMaxTablet = "isMaxTablet", // < 767
  isMinDesktop = "isMinDesktop", // 768 <
  isMinDesktopLarge = "isMinDesktopLarge", // 1136 <
  isMinDesktopMedium = "isMinDesktopMedium", // 938 <
  isMinMediumMobile = "isMinMediumMobile", // 360 <
  isMinMobile = "isMinMobile", // 480 <
  isMinTablet = "isMinTablet", // 592 <
}

export const useMediaBreakpoints = (): Record<Breakpoint, boolean> => {
  const isMinDesktopLarge = useMediaQuery({ minWidth: minWidthLargestDesktop });
  const isMinDesktopMedium = useMediaQuery({ minWidth: minWidthLargeDesktop });
  const isMinDesktop = useMediaQuery({ minWidth: minWidthDesktop });
  const isMaxTablet = useMediaQuery({ maxWidth: maxWidthTablet });
  const isMinMediumMobile = useMediaQuery({ minWidth: minWidthMobileMedium });
  const isMaxMediumMobile = useMediaQuery({ maxWidth: maxWidthMobileMedium });
  const isMaxMediumDesktop = useMediaQuery({ maxWidth: maxWidthMediumDesktop });
  const isMinMobile = useMediaQuery({ minWidth: minWidthMobileLarge });
  const isMinTablet = useMediaQuery({ minWidth: minWidthTablet });
  const isMaxLargeMobile = useMediaQuery({ maxWidth: maxWidthMobileLarge });
  const isMaxSmallMobile = useMediaQuery({ maxWidth: maxWidthMobileSmall });

  return {
    isMinDesktopLarge,
    isMinDesktopMedium,
    isMinDesktop,
    isMaxTablet,
    isMinTablet,
    isMinMediumMobile,
    isMaxMediumDesktop,
    isMaxMediumMobile,
    isMaxSmallMobile,
    isMaxLargeMobile,
    isMinMobile,
  };
};

export const Desktop = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <div className={classes.desktop}>{children}</div>;
};

export const Mobile = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <div className={classes.mobile}>{children}</div>;
};

interface Props {
  children: ReactNode;
  classPrefix?: string;
}

// eslint-disable-next-line react/display-name
export const ResponsiveClassesWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, classPrefix = "" }, ref) => {
    const classNamesValue = Object.entries(useMediaBreakpoints()).map(
      ([key, value]) => {
        return {
          [`${classPrefix}${classPrefix ? `-${key}` : key}`]: value,
        };
      }
    );

    return (
      <div className={classNames(classNamesValue)} ref={ref}>
        {children}
      </div>
    );
  }
);
