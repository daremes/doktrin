import {
  getAllDocs,
  getDocument,
  getJsTimestamp,
} from "../../../firebase/firebase";
import { getSlug } from "../../../utils/slug";

const Article = ({ data }: any) => {
  const { title, slug, created } = data;
  return (
    <>
      <h1>{title}</h1>
      <div>{slug}</div>
    </>
  );
};

export async function getStaticPaths() {
  const paths: any[] = [];
  const collectionData = await getAllDocs("articles");

  collectionData.forEach((doc) => {
    const data = doc.data();
    const timestamp = getJsTimestamp(data.created);
    paths.push({
      params: { slug: getSlug(data.title, timestamp) },
    });
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: any) {
  const articles: any[] = [];
  const collectionData = await getAllDocs("articles");

  collectionData.forEach((doc) => {
    const data = doc.data();
    const timestamp = getJsTimestamp(data.created);

    articles.push({
      ...data,
      slug: getSlug(data.title, timestamp),
      docId: doc.id,
      created: timestamp,
    });
  });

  const data = articles.find((article) => article.slug === params.slug);

  return {
    props: { data },
  };
}

export default Article;
