import classNames from "classnames";
import Link from "next/link";
import { createUseStyles } from "react-jss";
import { Locale } from "../utils/constants";
import { transformDate } from "../utils/dates";
import { EventData } from "./constants";

interface EventCardProps extends EventData {
  className?: string;
  dateBadgeClassName?: string;
}

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  dateBadgeContainer: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  dateBadge: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minHeight: 70,
    minWidth: 70,
    background: "#fff",
    border: "1px solid #000",
    borderRadius: 8,
    color: "#000",
    textTransform: "uppercase",
    boxShadow: "1px 1px 1px 2px rgba(255,255,255,0.06)",
  },
  month: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    fontSize: 16,
  },
  day: {
    color: "#fff",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 3,
    fontSize: 22,
  },
  dayName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    fontSize: 11,
  },
  text: {
    display: "flex",
    flexGrow: 4,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  event: {
    fontWeight: "bold",
    fontSize: 14,
    flexWrap: "wrap",
    textDecoration: "underline",
    flexGrow: 3,
  },
  director: {
    fontSize: 14,
    flexGrow: 3,
  },
  venue: {
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 2,
    "& a": {
      textDecoration: "underline",
      marginRight: 12,
    },
  },
  time: {
    marginTop: 1,
  },
});

const EventCard = ({
  actors,
  director,
  event,
  venue,
  shortDescription,
  description,
  date: dateString,
  isPremiere,
  url = "",
  className,
  dateBadgeClassName,
}: EventCardProps) => {
  const classes = useStyles();
  const { longDayName, shortMonthName, day, formatedTime } =
    transformDate(dateString);
  return (
    <div className={classNames(classes.wrapper, className)}>
      <div
        className={classNames(classes.dateBadgeContainer, dateBadgeClassName)}
      >
        <div className={classes.dateBadge}>
          <div className={classes.month}>{shortMonthName}</div>
          <div className={classes.day}>{day}</div>
          <div className={classes.dayName}>{longDayName}</div>
        </div>
      </div>
      <div className={classes.text}>
        <div className={classes.event}>
          <Link href={url}>{event}</Link>
        </div>
        <div className={classes.director}>{director}</div>
        <div className={classes.venue}>
          <Link href="/">{venue}</Link>
          <div className={classes.time}>{formatedTime}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
