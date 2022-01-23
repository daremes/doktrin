import Head from "next/head";
import Link from "next/link";
import { getDocument, getLocalizedDocs } from "../firebase/firebase";
import Navigation from "../components/Navigation";
import { createUseStyles } from "react-jss";
import Layout from "../components/Layout";
import { useMediaBreakpoints } from "../utils/responsive";

const useStyles = createUseStyles({
  imageContainer: {
    position: "relative",
    width: 140,
    "& img": {
      width: "100%",
    },
  },
  main: {
    minHeight: "100vh",
    padding: "4rem 0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
interface Props {
  data: any;
  imageUrl: string;
  locale: string;
  locales: string[];
  trans: any;
}

const DEV = false;

const Home = ({ data, locale, locales, trans }: Props) => {
  const { title, imageUrl } = data;
  const classes = useStyles();
  const { isMinDesktop } = useMediaBreakpoints();

  console.log(isMinDesktop);
  if (DEV) {
    return (
      <Layout>
        <Head>
          <title>dok.trin - platforma</title>
          <meta name="description" content="Divadlo dok.trin" />
        </Head>
        <main className={classes.main}>
          <div className={classes.imageContainer}>
            <img src="/logo-doktrin.gif" alt="logo" />
          </div>
          <div>Na webu se pracuje.</div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Divadlo dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={classes.main}>
        <h1>{trans[locale].title}</h1>
        <Link href="/admin">Administrace contentu</Link>
        <Link href="/articles" locale={locale}>
          Articles
        </Link>
        <div>
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={imageUrl}
            alt="test image"
          />
        </div>
      </main>
      <footer>xxx</footer>
    </Layout>
  );
};

export async function getStaticProps({
  locale,
  locales,
}: {
  locale: string;
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
