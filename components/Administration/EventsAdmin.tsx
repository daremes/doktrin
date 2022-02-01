import dayjs from "dayjs";
import { collection, doc } from "firebase/firestore";
import { uniqueId } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { db, getAllDocs, writeBatch } from "../../firebase/firebase";
import { transformDate } from "../../utils/dates";
import Button from "../Button";
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
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    margin: "24px 0",
    '& input[type="datetime-local" i]': {
      fontFamily: "Lato",
      maxWidth: 220,
    },
    "& input": {
      fontSize: 16,
      height: 32,
      maxWidth: 400,
      marginBottom: 8,
    },
  },
  saveButton: {
    color: "#fff",
    border: "1px solid #000",
    background: "#000",
    padding: 8,
    "&:disabled": {
      color: "#ccc",
      borderColor: "#ccc",
      background: "transparent",
      pointerEvents: "none",
      cursor: "progress",
    },
  },
});

interface EventDataEditable extends EventDataApi {
  id: string;
}

const EventsAdmin = ({}: Props) => {
  const classes = useStyles();
  const [events, setEvents] = useState<EventDataEditable[]>();
  const [originalEvents, setOrignalEvents] = useState<EventDataEditable[]>();
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState(false);

  const onCreate = (id: string) => {
    const newEvent = {
      id,
      venue: "",
      date: new Date().toISOString(),
      event: "Nová událost",
      actors: "",
      description: "",
      director: "",
      isPremiere: false,
      shortDescription: "",
      url: "",
    };
    setEvents([...(events?.length ? events : []), newEvent]);
  };

  const onDelete = (id: string) => {
    const updated = events?.filter((ev) => ev.id !== id);
    setEvents(updated);
    if (!touched) {
      setTouched(true);
    }
  };

  const onSave = async () => {
    if (!originalEvents || !events) {
      return;
    }
    setLoading(true);

    const batch = writeBatch(db);

    originalEvents.forEach((original) => {
      const isInUpdated = events.find((event) => original.id === event.id);
      if (!isInUpdated) {
        console.log("toDelete", original.id, original.event);
        const ref = doc(db, "events", original.id);
        batch.delete(ref);
      }
    });
    events.forEach((event) => {
      const isInOriginal = originalEvents.find(
        (original) => event.id === original.id
      );
      if (!isInOriginal) {
        console.log("toCreate", event.id, event.event);
        const ref = doc(collection(db, "events"));
        batch.set(ref, event);
      } else if (JSON.stringify(isInOriginal) !== JSON.stringify(event)) {
        console.log("UPDATE", event.event);
        const ref = doc(db, "events", event.id);
        batch.update(ref, { ...event });
      }
    });

    try {
      await batch.commit();
      setOrignalEvents(events);
      setTouched(false);
      setLoading(false);
    } catch (e) {
      console.error("Boom", e);
    }
  };

  const handleInputChange = (
    id: string,
    fieldName: string,
    value: string | boolean
  ) => {
    if (!events) {
      return;
    }
    if (!touched) {
      setTouched(true);
    }
    const changed = events.map((ev) => {
      if (ev.id === id) {
        return {
          ...ev,
          [fieldName]: value,
        };
      }
      return ev;
    });
    setEvents(changed);
  };

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
      setOrignalEvents(events);
      setLoading(false);
    };
    getEvents();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div>
        {events?.map((ev) => {
          const { dateTimeLocalString } = transformDate(ev.date);
          return (
            <div className={classes.eventListItem} key={ev.id}>
              <div className={classes.inputGroup}>
                <label htmlFor={`event-${ev.id}`}>Název události</label>
                <input
                  id={`event-${ev.id}`}
                  type="text"
                  value={ev.event}
                  onChange={(e) =>
                    handleInputChange(ev.id, "event", e.target.value)
                  }
                />
                <label htmlFor={`date-${ev.id}`}>
                  Datum a čas začátku události
                </label>
                <input
                  id={`date-${ev.id}`}
                  type="datetime-local"
                  value={dateTimeLocalString}
                  onChange={(e) =>
                    handleInputChange(
                      ev.id,
                      "date",
                      new Date(e.target.value).toISOString()
                    )
                  }
                />
                <label htmlFor={`venue-${ev.id}`}>Místo konání?</label>
                <input
                  id={`venue-${ev.id}`}
                  type="text"
                  value={ev.venue}
                  onChange={(e) =>
                    handleInputChange(ev.id, "venue", e.target.value)
                  }
                />
              </div>
              <Button
                className={classes.saveButton}
                disabled={loading}
                onClick={() => onDelete(ev.id)}
              >
                Smazat
              </Button>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          className={classes.saveButton}
          onClick={() => {
            onCreate(uniqueId("NEW"));
          }}
        >
          Přidat
        </Button>
      </div>
      <Button
        disabled={loading || !touched}
        className={classes.saveButton}
        onClick={onSave}
      >
        Uložit
      </Button>
      {loading && <Spinner />}
    </div>
  );
};

export default EventsAdmin;
