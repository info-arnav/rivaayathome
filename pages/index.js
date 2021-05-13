import Link from "next/link";
import Head from "../components/head";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ status, posts, notFound }) {
  return (
    <div>
      <Head></Head>
      {!notFound && (
        // Manage home page layout here
        <main class="grid-container">
          {posts.map((e) => (
            <div>
              <img
                class="grid-item grid-item-1 lazyload"
                src-set={`/\api\\image\\post\\${e._id}`}
                src={e.compressed}
                alt=""
              />
              <p>{posts.indexOf(e)}</p>
            </div>
          ))}
        </main>
      )}
      <br></br>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("posts")
    .aggregate([
      { $sort: { dateUpdated: -1 } },
      {
        $project: {
          title: 1,
          blog: 1,
          username: 1,
          tags: 1,
          dateUpdated: true,
          compressed: 1,
          imageDescription: 1,
        },
      },
    ])
    .limit(20)
    .toArray();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: JSON.parse(JSON.stringify(data)),
    },
  };
}
