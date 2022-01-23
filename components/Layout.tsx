import { Locale } from "../pages";
import { createUseStyles } from "react-jss";
import Navigation from "./Navigation";

const useStyles = createUseStyles({
  layout: {
    width: "100%",
    position: "relative",
    overflowX: "hidden",
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
