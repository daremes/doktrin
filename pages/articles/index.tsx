import { getAllDocs, getJsTimestamp } from "../../firebase/firebase";
import Link from "next/link";
import { getSlug } from "../../utils/slug";
import Navigation from "../../components/Navigation";

const ArticleList = ({ articles }: any) => {
  return (
    <>
      <Navigation />
      <Link href={"/"}>Home</Link>
      <h1>List</h1>
      <ul>
        {articles.map((article: any) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps({ locales }: { locales: string[] }) {
  const collectionData = await getAllDocs("articles", {
    orderBy: "created",
    direction: "desc",
  });

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

  return {
    props: { articles },
  };
}

export default ArticleList;
