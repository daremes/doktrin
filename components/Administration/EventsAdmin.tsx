import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { getAllDocs } from "../../firebase/firebase";
import { transformDate } from "../../utils/dates";
import { EventDataApi } from "../constants";
import Spinner from "../Spinner";

interface Props {}

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  eventListItem: {
    marginBottom: 8,
  },
});

interface EventDataEditable extends EventDataApi {
  id: string;
}

const EventsAdmin = ({}: Props) => {
  const classes = useStyles();
  const [events, setEvents] = useState<EventDataEditable[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await getAllDocs("events");
      const events = data.docs.map((doc) => {
        const data = doc.data() as EventDataApi;
        return {
          ...data,
          id: doc.id,
        };
      });
      setEvents(events);
      setLoading(false);
    };
    getEvents();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div>
        {events?.map((ev) => {
          const { formatedDateTime } = transformDate(ev.date);
          return (
            <div className={classes.eventListItem} key={ev.id}>
              <div>{ev.id}</div>
              <div>{ev.event}</div>
              <div>{formatedDateTime}</div>
              <div>{ev.venue}</div>
            </div>
          );
        })}
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default EventsAdmin;
