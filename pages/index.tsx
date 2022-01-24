/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { getDocument, getLocalizedDocs } from "../firebase/firebase";
import Navigation from "../components/Navigation";
import { createUseStyles } from "react-jss";
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { mediaMaxTablet639 } from "../utils/responsive";
import Button from "../components/Button";
import { BASE_GREEN } from "../styles/colors";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
// import { useMediaBreakpoints } from "../utils/responsive";

export enum Locale {
  cs = "cs",
  en = "en",
}

const LANDING_HEIGHT_DESKTOP = 800;
const LANDING_HEIGHT_MOBILE = 580;

const useStyles = createUseStyles({
  imageContainer: {
    position: "relative",
    width: 140,
    "& img": {
      width: "100%",
    },
  },
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
  landingImg: {
    opacity: 1,
    position: "absolute",
    height: LANDING_HEIGHT_DESKTOP,
    objectFit: "cover",
    zIndex: -10,
    width: "100%",
    transform: "scale(1)",
    transition: "opacity 3s, transform 2s",
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE,
    },
  },
  mainImg: {
    zIndex: -5,
  },
  overlay: {
    zIndex: -2,
    position: "absolute",
    height: LANDING_HEIGHT_DESKTOP,
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    // background: "radial-gradient(transparent, rgba(0,0,0,.84))",
    [mediaMaxTablet639]: {
      height: LANDING_HEIGHT_MOBILE,
    },
  },
  toggleHide: {
    opacity: 0,
    transform: "scale(1.2)",
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
});
interface Props {
  data: any;
  imageUrl: string;
  locale: Locale;
  locales: string[];
  trans: any;
}

const DEV = false;

const Home = ({ data, locale, locales, trans }: Props) => {
  const { title, imageUrl } = data;
  const classes = useStyles();
  const [imgagesAlt, setImagesAlt] = useState(["", "", ""]);
  const [activeImage, setActiveImage] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ctaOpen, setCtaOpen] = useState(false);

  useEffect(() => {
    setImagesAlt(["landing-2", "landing-3", "landing-4"]);
    const onImageChange = () => {
      setActiveImage((prev) => {
        const total = imgagesAlt.length;
        if (prev === total) {
          return 0;
        }
        return prev + 1;
      });
      timeoutRef.current = setTimeout(onImageChange, 6000);
    };
    timeoutRef.current = setTimeout(onImageChange, 6000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [imgagesAlt.length]);
  // const { isMinDesktop } = useMediaBreakpoints();
  // if (DEV) {
  //   return (
  //     <>
  //       <Head>
  //         <title>dok.trin - platforma</title>
  //         <meta name="description" content="Divadlo dok.trin" />
  //       </Head>
  //       <main className={classes.main}>
  //         <div className={classes.imageContainer}>
  //           <img src="/logo-doktrin.gif" alt="logo" />
  //         </div>
  //         <div>Na webu se pracuje.</div>
  //       </main>
  //     </>
  //   );
  // }

  const CtaIcon = () =>
    ctaOpen ? (
      <IoChevronUp size={20} className={classes.actionIconWrapper} />
    ) : (
      <IoChevronDown size={20} className={classes.actionIconWrapper} />
    );

  return (
    <Layout locale={locale}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Divadlo dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={classes.container}>
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet="/landing-1-desktop.jpg 2x"
            />
            <source
              media="(min-width: 640px)"
              srcSet="/landing-1-tablet.jpg 2x"
            />
            <img
              alt=""
              className={classnames(classes.landingImg, classes.mainImg, {
                [classes.toggleHide]: activeImage !== 0,
              })}
              srcSet="/landing-1-mobile.jpg 2x"
            />
          </picture>
          {imgagesAlt.map((img, index) => (
            <picture key={index}>
              <source
                media="(min-width: 1200px)"
                srcSet={
                  imgagesAlt[index] ? `${imgagesAlt[index]}-desktop.jpg 2x` : ""
                }
              />
              <source
                media="(min-width: 640px)"
                srcSet={
                  imgagesAlt[index] ? `${imgagesAlt[index]}-tablet.jpg 2x` : ""
                }
              />
              <img
                alt=""
                className={classnames(classes.landingImg, {
                  [classes.toggleHide]: activeImage !== index + 1,
                })}
                srcSet={
                  imgagesAlt[index] ? `${imgagesAlt[index]}-mobile.jpg 2x` : ""
                }
              />
            </picture>
          ))}
          <div className={classnames(classes.overlay)} />
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
                      <CtaIcon />
                      Nejbližší události
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <h1>{trans[locale].title}</h1>
        <Link href="/admin">Administrace contentu</Link>
        <Link href="/articles" locale={locale}>
          Articles
        </Link> */}
        <section className={classes.content}>
          <h1>platforma dok.trin</h1>
          <p>
            {`
            I'm baby austin single-origin coffee mlkshk, narwhal health goth
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
  return {
    props: { data, locale, locales, trans },
  };
}

export default Home;
