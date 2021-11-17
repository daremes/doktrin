import { getAllDocs, getJsTimestamp } from "../../firebase/firebase";
import { getSlug } from "../../utils/slug";

export default async function handler(req: any, res: any) {
  console.log(process.env.TEST_API);
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
      test: process.env.TEST_API,
    });
  });
  console.log("server", articles);
  res.status(200).json(articles);
}
