import Link from "next/link";
import { useRouter } from "next/router";
import Head from "../components/head";
import Layout from "../components/layout";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ status, posts, notFound }) {
  const router = useRouter();

  return (
    <div>
      <Head></Head>
      <div id="wrap">
        <div id="columns" class="columns_4">
          {!notFound && (
            <div>
              <Layout items={posts}></Layout>
            </div>
          )}
          <br></br>{" "}
        </div>
      </div>
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
    .limit(40)
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
