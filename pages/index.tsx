import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getDocument } from "../firebase/firebase";

interface Props {
  data: any;
  imageUrl: string;
}

const Home = ({ data }: Props) => {
  const { title, imageUrl } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Divadlo dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <Link href="/admin">Administrace contentu</Link>
        <div>
          <img src={imageUrl} alt="test image" />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export async function getStaticProps(context: any) {
  async function getHomepage() {
    const homepage = getDocument("pages", "homepage");
    return homepage;
  }
  const data = await getHomepage();
  return {
    props: { data },
  };
}

export default Home;
