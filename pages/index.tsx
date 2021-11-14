import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getDocument } from "../firebase/firebase";

interface Props {
  data: any;
  title: string;
}

const Home = ({ data }: Props) => {
  console.log(data);
  const { title } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Divadlo dok.trin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
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
