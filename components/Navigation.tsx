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
import { useState } from "react";
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
    borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0px 0px 9px 3px rgba(255,255,255,.25)",
    color: "#fff",
    zIndex: 10,
    paddingRight: 48,
    paddingLeft: 48,
    boxSizing: "border-box",
    overflowX: "hidden",
    [mediaMaxDesktop1023]: {
      justifyContent: "space-between",
    },
    [mediaMaxTablet767]: {
      paddingRight: 24,
      paddingLeft: 24,
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
  burgerMenu: {
    color: "#fff",
    border: "none",
    transition: "color 0.6s",
    "&:hover": {
      color: BASE_GREEN,
    },
    "&:active": {
      color: BASE_GREEN,
    },
    [mediaMinDesktop1024]: {
      display: "none",
    },
  },
  icon: {
    transition: "transform 0.5s, scaleY 0.5s",
    transform: "rotate(0deg) scaleY(1)",
  },
  menuOpen: {
    transform: "rotate(90deg) scaleY(1.2)",
  },
  desktopMenu: {
    [mediaMaxDesktop1023]: {
      display: "none",
    },
  },
});

const Navigation = () => {
  const router = useRouter();
  const { locales, pathname, locale } = router;
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(menuOpen);
  return (
    <nav className={classes.navWrapper}>
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
      <button
        className={classNames(classes.burgerMenu)}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <ImMenu
          className={classNames(classes.icon, { [classes.menuOpen]: menuOpen })}
          size={40}
        />
      </button>
      {/* {locales?.map((loc) => (
        <Link key={loc} href={pathname} locale={loc}>
          {loc}
        </Link>
      ))} */}
    </nav>
  );
};
export default Navigation;
