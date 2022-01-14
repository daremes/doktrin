import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getDocument, getLocalizedDocs } from "../firebase/firebase";
import Navigation from "../components/Navigation";
import { createUseStyles } from "react-jss";
import { relative } from "path/posix";

const useStyles = createUseStyles({
  imageContainer: {
    position: "relative",
    width: 140,
    "& img": {
      width: "100%",
    },
  },
});
interface Props {
  data: any;
  imageUrl: string;
  locale: string;
  locales: string[];
  trans: any;
}

const DEV = true;

const Home = ({ data, locale, locales, trans }: Props) => {
  const { title, imageUrl } = data;
  const classes = useStyles();

  if (DEV) {
    return (
      <div className={styles.container}>
        <Head>
          <title>dok.trin - platforma</title>
          <meta name="description" content="Divadlo dok.trin" />
        </Head>
        <main className={styles.main}>
          <div className={classes.imageContainer}>
            <img src="/logo-doktrin.gif" alt="logo" />
          </div>
          <div>Na webu se pracuje.</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Divadlo dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>{trans[locale].title}</h1>
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
      <footer className={styles.footer}></footer>
    </div>
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
