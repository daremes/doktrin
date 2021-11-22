import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getDocument, getLocalizedDocs } from "../firebase/firebase";
import Navigation from "../components/Navigation";

interface Props {
  data: any;
  imageUrl: string;
  locale: string;
  locales: string[];
  trans: any;
}

const Home = ({ data, locale, locales, trans }: Props) => {
  const { title, imageUrl } = data;

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
