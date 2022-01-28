import { createUseStyles } from "react-jss";
import { transformDate } from "../utils/dates";
import { EventData } from "./constants";

interface EventCardProps extends EventData {}

const useStyles = createUseStyles({
  wrapper: {},
  dateContainer: {},
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
}: EventCardProps) => {
  const classes = useStyles();
  const { shortDayName, shortMonthName, day } = transformDate(dateString);
  console.log(shortDayName, shortMonthName, day);
  //   console.log(formatStringToDayJs(date));
  return (
    <div className={classes.wrapper}>
      <div className={classes.dateContainer}>
        {shortMonthName}
        {day}
        {shortDayName}
      </div>
    </div>
  );
};

export default EventCard;
