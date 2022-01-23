import Link from "next/link";
import { useRouter } from "next/router";
import { createUseStyles } from "react-jss";

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
  },
  logo: {
    width: 140,
    minWidth: 140,
    marginRight: 100,
    "& img": {
      maxWidth: "100%",
    },
  },
  menuItem: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

const Navigation = () => {
  const router = useRouter();
  const { locales, pathname } = router;
  const classes = useStyles();
  return (
    <nav className={classes.navWrapper}>
      <div className={classes.logo}>
        <img src="/logo-doktrin.gif" alt="logo" />
      </div>
      <div className={classes.menuItem}>Položka</div>
      <div className={classes.menuItem}>Něco dalšího</div>
      <div className={classes.menuItem}>Rezervace</div>

      {/* {locales?.map((loc) => (
        <Link key={loc} href={pathname} locale={loc}>
          {loc}
        </Link>
      ))} */}
    </nav>
  );
};
export default Navigation;
