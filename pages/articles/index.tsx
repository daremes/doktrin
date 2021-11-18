import { getAllDocs, getJsTimestamp } from "../../firebase/firebase";
import Link from "next/link";
import { getSlug } from "../../utils/slug";

const ArticleList = ({ articles }: any) => {
  return (
    <>
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

export async function getStaticProps() {
  const articles: any[] = [];
  const collectionData = await getAllDocs("articles", {
    orderBy: "created",
    direction: "desc",
  });

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

  return {
    props: { articles },
  };
}

export default ArticleList;
