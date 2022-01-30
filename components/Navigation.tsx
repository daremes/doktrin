/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { createUseStyles } from "react-jss";
import {
  mediaMaxDesktop1023,
  mediaMaxTablet767,
  mediaMinDesktop1024,
} from "../utils/responsive";
import { ImMenu } from "react-icons/im";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Button from "./Button";
import { BASE_GREEN } from "../styles/colors";

const useStyles = createUseStyles({
  navWrapper: {
    display: "flex",
    position: "absolute",
    width: "100%",
    top: 0,
    height: 58,
    alignItems: "center",
    background: "transparent",
    borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0px 0px 4px 2px rgba(255,255,255,0.12)",
    color: "#fff",
    zIndex: 100,
    paddingRight: 48,
    paddingLeft: 48,
    opacity: 0,
    boxSizing: "border-box",
    transition: "background 0.2s, box-shadow 0.2s, color 0.2s, opacity 0.8s",
    overflowX: "hidden",
    [mediaMaxDesktop1023]: {
      justifyContent: "space-between",
    },
    [mediaMaxTablet767]: {
      paddingRight: 24,
      paddingLeft: 24,
    },
  },
  navWrapperSolid: {
    position: "fixed",
    background: "#fff",
    color: BASE_GREEN,
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.18)",
  },
  isTop: {
    position: "absolute",
    opacity: 1,
    transition: "opacity 0.5s, background 0.5s",
  },
  isDown: {
    opacity: 0,
    transition: "opacity 0.5s, background 0.5s",
  },
  isUp: {
    opacity: 1,
    transition: "opacity 0.5s, background 0.5s",
    position: "fixed",
    background: "#fff",
    color: BASE_GREEN,
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.18)",
    "& $menuItem": {
      color: "#000",
    },
    "& $burgerMenu": {
      color: "#000",
    },
  },
  logo: {
    width: 140,
    marginRight: 100,
    "& img": {
      maxWidth: "100%",
    },
  },
  menuList: {
    listStyle: "none",
    display: "flex",
  },
  menuItem: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 16,
    paddingRight: 16,
  },
  mobileMenuList: {
    width: "100%",
    height: "100%",
    minWidth: 300,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileMenuItem: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 0,
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0,
    transition: "opacity 0.5s, font-size 0.5s",
  },
  menuItemVisible: {
    fontSize: 24,
    opacity: 1,
  },
  burgerMenu: {
    color: "#fff",
    border: "none",
    transition: "color 0.6s",
    "&:hover": {
      color: BASE_GREEN,
      "@media (hover: none)": {
        color: "#fff",
      },
    },
    [mediaMinDesktop1024]: {
      display: "none",
    },
  },
  burgerMenuSolid: {
    color: "#000",
  },
  icon: {
    transition: "transform 0.5s, scaleY 0.5s",
    transform: "rotate(0deg) scaleY(1)",
  },
  menuOpen: {
    color: "#000",
    transform: "rotate(90deg) scaleY(1.2)",
  },
  desktopMenu: {
    [mediaMaxDesktop1023]: {
      display: "none",
    },
  },
  mobileMenu: {
    position: "fixed",
    width: 0,
    color: "#000",
    height: "calc(100vh - 58px)",
    background: "#fafafa",
    zIndex: 50,
    top: 58,
    transition: "width 0.3s, visibility 0.3s",
    visibility: "visible",
    [mediaMinDesktop1024]: {
      visibility: "hidden",
    },
  },
  showMobileMenu: {
    width: "100%",
  },
  hideMobileMenu: {
    visibility: "hidden",
  },
});

enum ScrollState {
  top = "top",
  up = "up",
  down = "down",
}

const Navigation = () => {
  const router = useRouter();
  const { locale } = router;
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState(ScrollState.top);

  useEffect(() => {
    console.log("mounted");
    let reqAnimRef: number | null = null;
    let prevY = 0;
    const handleScroll = (y: number) => {
      if (y === 0 || (y < 50 && y > prevY)) {
        console.log("TOP");
        setScrollState(ScrollState.top);
      } else if (prevY > y) {
        console.log("UP");
        setScrollState(ScrollState.up);
      } else {
        console.log("DOWN");
        setScrollState(ScrollState.down);
      }
      prevY = y;
    };
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const onScroll = (e: Event) => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        reqAnimRef = window.requestAnimationFrame(() => {
          handleScroll(lastKnownScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      console.log("unmounted");
      if (reqAnimRef) {
        cancelAnimationFrame(reqAnimRef);
      }
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const bodyEl = document.getElementsByTagName("body")[0];
    if (!bodyEl) {
      return;
    }
    if (menuOpen) {
      bodyEl.style.height = "100vh";
      bodyEl.style.overflowY = "hidden";
    } else {
      bodyEl.style.height = "100%";
      bodyEl.style.overflowY = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={classNames(classes.navWrapper, {
          [classes.isTop]: scrollState === ScrollState.top,
          [classes.isDown]: scrollState === ScrollState.down,
          [classes.isUp]: scrollState === ScrollState.up,
          [classes.navWrapperSolid]: menuOpen,
        })}
      >
        <div className={classes.logo}>
          <Link href="/" locale={locale} passHref>
            <img src="/logo-doktrin.gif" alt="logo" />
          </Link>
        </div>
        <div className={classes.desktopMenu}>
          <ul className={classes.menuList}>
            <li className={classes.menuItem}>
              <Link href="/" locale={locale}>
                První položka
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link href="/" locale={locale}>
                O druhé
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link href="/" locale={locale}>
                Asi poslední položka
              </Link>
            </li>
          </ul>
        </div>
        <Button
          className={classNames(classes.burgerMenu, {
            [classes.burgerMenuSolid]: menuOpen,
          })}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <ImMenu
            className={classNames(classes.icon, {
              [classes.menuOpen]: menuOpen,
            })}
            size={40}
          />
        </Button>
        {/* {locales?.map((loc) => (
        <Link key={loc} href={pathname} locale={loc}>
          {loc}
        </Link>
      ))} */}
      </nav>
      <div
        className={classNames(classes.mobileMenu, {
          [classes.hideMobileMenu]: !menuOpen,
          [classes.showMobileMenu]: menuOpen,
        })}
      >
        <ul className={classes.mobileMenuList}>
          <li
            className={classNames(classes.mobileMenuItem, {
              [classes.menuItemVisible]: menuOpen,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Link href="/" locale={locale}>
              První položka
            </Link>
          </li>
          <li
            className={classNames(classes.mobileMenuItem, {
              [classes.menuItemVisible]: menuOpen,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Link href="/" locale={locale}>
              O druhé
            </Link>
          </li>
          <li
            className={classNames(classes.mobileMenuItem, {
              [classes.menuItemVisible]: menuOpen,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Link href="/" locale={locale}>
              Asi poslední položka
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navigation;
