/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import {
  getAllDocs,
  getDocument,
  getLocalizedDocs,
} from "../firebase/firebase";
import { createUseStyles } from "react-jss";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { mediaMaxMobile413, mediaMaxTablet639 } from "../utils/responsive";
import Button from "../components/Button";
import { BASE_GREEN } from "../styles/colors";
import { IoCalendar, IoChevronUp } from "react-icons/io5";
import {
  LANDING_HEIGHT_DESKTOP,
  LANDING_HEIGHT_MOBILE,
  Locale,
} from "../utils/constants";
import HeroSlider from "../components/HeroSlider";
import UnderConstruction from "../components/UnderConstruction";
import Modal from "../components/Modal";
import EventCard from "../components/EventCard";
import { EventDataApi } from "../components/constants";
import ImageLoader from "../components/ImageLoader";

const DEV = false;

const useStyles = createUseStyles({
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 24,
  },
  titleBackground: {},
  container: {
    position: "relative",
    height: LANDING_HEIGHT_DESKTOP,
    boxSizing: "border-box",
    width: "100%",
    overflow: "hidden",
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE,
    },
  },
  landing: {
    width: "100%",
    position: "absolute",
  },
  landingContent: {
    position: "relative",
    height: "100%",
    margin: "0px 48px 0 48px",
    paddingTop: 58,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cta: {
    height: LANDING_HEIGHT_DESKTOP - 600,
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE - 300,
    },
  },
  actionWrapper: {},
  actionButton: {
    color: "#000",
    padding: "12px 12px 12px 6px",
    fontSize: 18,
    fontWeight: "bold",
    border: `2px solid ${BASE_GREEN}`,
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.38)",
    transition: "background 0.5s",
    background: BASE_GREEN,
    textTransform: "uppercase",
    "&:hover": {
      background: "rgba(0,0,0,0.3)",
      color: "#fff",
      "@media (hover: none)": {
        background: BASE_GREEN,
        color: "#000",
      },
    },
    [mediaMaxMobile413]: {
      fontSize: 16,
    },
  },
  actionButtonOpen: {
    color: "#fff",
    border: `2px solid ${BASE_GREEN} `,
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.38)",
    background: "rgba(0,0,0,0.3)",
  },
  actionButtonWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  actionButtonContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconWrapper: {
    marginRight: 8,
  },
  content: {
    position: "relative",
    margin: "16px 48px 16px 48px",
  },
  eventCard: {
    marginBottom: 12,
  },
});
interface Props {
  data: any;
  imageUrl: string;
  locale: Locale;
  locales: string[];
  trans: any;
  events: EventDataApi[];
}

const Home = ({ data, locale, locales, trans, events }: Props) => {
  const { title, testImage } = data;
  const classes = useStyles();
  const [ctaOpen, setCtaOpen] = useState(false);

  if (DEV) {
    return <UnderConstruction />;
  }

  const sortedEvents = events
    .sort((a, b) => {
      const aa = new Date(a.date);
      const bb = new Date(b.date);
      return +aa - +bb;
    })
    .filter((item) => {
      const date = new Date(item.date);
      const now = new Date();
      return date >= now;
    });

  return (
    <Layout locale={locale}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Platforma dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={classes.container}>
          <HeroSlider />
          <Modal
            title="Nejbližší události"
            visible={ctaOpen}
            onClose={() => setCtaOpen(false)}
          >
            {(sortedEvents || []).map((ev) => (
              <EventCard key={ev.date} className={classes.eventCard} {...ev} />
            ))}
          </Modal>
          <div className={classes.landingContent}>
            <div className={classes.cta}>
              <div className={classes.titleBackground}>
                <h1 className={classes.title}>platforma dok.trin</h1>
              </div>
              <div className={classes.actionWrapper}>
                <div className={classes.actionButtonWrapper}>
                  <Button
                    className={classes.actionButton}
                    onClick={() => {
                      setCtaOpen((prev) => !prev);
                    }}
                  >
                    <span className={classes.actionButtonContent}>
                      <IoCalendar
                        size={20}
                        className={classes.actionIconWrapper}
                      />
                      Nejbližší události
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.content}>
          <div style={{ width: 300 }}>
            Test loadovani obrazku z db
            <ImageLoader id={testImage} />
          </div>
          <p>
            {`
            TEST austin single-origin coffee mlkshk, narwhal health goth
            cloud bread woke snackwave. Poke pok pok lo-fi church-key master
            cleanse lyft subway tile letterpress mlkshk sriracha cray shabby
            chic small batch chambray gastropub. XOXO actually gluten-free put a
            bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
              bird on it prism intelligentsia ramps pour-over quinoa leggings
            street art irony austin craft beer. Copper mug freegan unicorn
            forage, intelligentsia meditation mixtape lyft health goth keffiyeh
            vaporware man bun edison bulb schlitz. Brooklyn tbh kogi raclette
            yuccie semiotics mustache slow-carb disrupt franzen williamsburg
            locavore. 90's lomo chicharrones authentic subway tile, air plant
            hashtag. Synth chillwave try-hard twee celiac vinyl affogato art
            party. Semiotics jianbing small batch banh mi roof party narwhal,
            iceland green juice VHS synth fixie vexillologist sustainable.
            Keffiyeh beard chicharrones drinking vinegar cardigan biodiesel
            tumblr asymmetrical succulents letterpress. Truffaut freegan squid
            roof party. Gastropub plaid leggings activated charcoal paleo master
            cleanse taiyaki blog PBR&B lomo poutine neutra lo-fi street art
            normcore. Cray succulents glossier godard. Crucifix ugh kogi neutra,
            forage austin poutine VHS dreamcatcher street art. Bitters crucifix
            raclette, ennui dreamcatcher actually drinking vinegar normcore.
            Banh mi mustache migas, next level snackwave keytar hot chicken
            meggings retro XOXO.
      `}
          </p>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticProps({
  locale,
  locales,
}: {
  locale: Locale;
  locales: string[];
}) {
  async function getHomepage() {
    const homepage = getDocument("pages", "homepage");
    return homepage;
  }
  const data = await getHomepage();
  const trans = await getLocalizedDocs("pages", "homepage", locales);
  const eventCollection = await getAllDocs("events");
  const events = eventCollection.docs.map((doc) => doc.data() as EventDataApi);

  return {
    props: { data, locale, locales, trans, events },
  };
}

export default Home;
