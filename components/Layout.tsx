import { Locale } from "../pages";
import { createUseStyles } from "react-jss";
import Navigation from "./Navigation";
import { useRef, useState } from "react";

const useStyles = createUseStyles({
  layout: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
  },
  children: {},
});

interface Layout {
  children: React.ReactNode;
  locale?: Locale;
}

const Layout = ({ children, locale }: Layout) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Navigation />
      <div className={classes.children}>{children}</div>
      <footer>xxxxxxxx</footer>
    </div>
  );
};

export default Layout;
