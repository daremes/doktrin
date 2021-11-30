import {
  getAllDocs,
  getDocument,
  getJsTimestamp,
} from "../../../firebase/firebase";
import { getSlug } from "../../../utils/slug";

const Article = ({ data, locale, locales }: any) => {
  const { title, slug, created } = data;
  return (
    <>
      <h1>{title}</h1>
      <div>{slug}</div>
      <div>verze: {locale}</div>
    </>
  );
};

export async function getStaticPaths() {
  const paths: any[] = [];
  const collectionData = await getAllDocs("articles");

  collectionData.forEach((doc) => {
    const data = doc.data();
    const timestamp = getJsTimestamp(data.created);
    paths.push(
      {
        params: { slug: getSlug(data.title, timestamp) },
        locale: "cs",
      },
      {
        params: { slug: getSlug(data.title, timestamp) },
        locale: "en",
      }
    );
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params, locale, locales }: any) {
  const collectionData = await getAllDocs("articles");

  const articles = collectionData.docs.map((doc) => {
    const data = doc.data();
    const timestamp = getJsTimestamp(data.created);
    return {
      ...data,
      slug: getSlug(data.title, timestamp),
      docId: doc.id,
      created: timestamp,
    };
  });

  const data = articles.find((article) => article.slug === params.slug);
  console.log(articles);
  return {
    props: { data, locale, locales },
  };
}

export default Article;
