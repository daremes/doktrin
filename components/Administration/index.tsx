import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { createUseStyles } from "react-jss";
import Button from "../Button";
import EventsAdmin from "./EventsAdmin";
import Spinner from "../Spinner";
import classNames from "classnames";

interface Props {
  currentUser: User;
  handleSignOut: () => void;
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "100%",
  },
  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    background: "#000",
    color: "#fff",
    boxShadow: "0 4px 4px -4px rgba(0,0,0,.8)",
  },
  logout: {
    position: "absolute",
    right: 32,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  user: {
    position: "absolute",
    left: 32,
    fontSize: 12,
  },
  content: {
    margin: 24,
  },
  tabMenu: {
    marginBottom: 24,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {},
  tabMenuButton: {
    fontSize: 24,
    color: "#000",
    border: "1px solid #000",
    borderRadius: 0,
    background: "transparent",
    height: 50,
    minWidth: 100,
    transition: "background 0.5s",
  },
  selectedTabMenuButton: {
    color: "#fff",
    border: "1px solid #000",
    background: "#000",
  },
});

enum Tabs {
  events = "events",
  others = "others",
}

export const Administration = ({ currentUser, handleSignOut }: Props) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.events);
  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <div className={classes.user}>
          <div>{currentUser.email}</div>
        </div>
        <div className={classes.logout}>
          <Button onClick={handleSignOut}>Logout</Button>
        </div>
        <h1 className={classes.pageTitle}>admin</h1>
      </nav>
      <div className={classes.content}>
        <div className={classes.tabMenu}>
          <Button
            className={classNames(classes.tabMenuButton, {
              [classes.selectedTabMenuButton]: selectedTab === Tabs.events,
            })}
            onClick={() => {
              setSelectedTab(Tabs.events);
            }}
          >
            Events
          </Button>
          <Button
            className={classNames(classes.tabMenuButton, {
              [classes.selectedTabMenuButton]: selectedTab === Tabs.others,
            })}
            onClick={() => {
              setSelectedTab(Tabs.others);
            }}
          >
            Další
          </Button>
        </div>
        <div className={classes.tabs}>
          {selectedTab === Tabs.events && <EventsAdmin />}
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};
