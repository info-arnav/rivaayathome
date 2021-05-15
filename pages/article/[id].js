import Link from "next/link";
import Head from "../../components/head";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId, ObjectID } from "bson";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ status, posts, notFound }) {
  const routers = useRouter();
  useEffect(() => {
    if (!posts[0]) {
      routers.push("/404");
    }
  });

  return (
    <div>
      {posts[0] && (
        <div>
          <Head
            about={`DaisForAll | ${posts[0].blog
              .replace(/<[^>]*>/g, "")
              .slice(0, 160)}....`}
            title={`DaisForAll | ${posts[0].title}`}
          ></Head>
        </div>
      )}
      <br></br>
    </div>
  );
}

export async function getServerSideProps(params) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("posts")
    .aggregate([
      { $match: { _id: ObjectId(params.params.id) } },
      {
        $project: {
          title: 1,
          blog: 1,
          username: 1,
          tags: 1,
          dateUpdated: true,
          compressed: 1,
          imageDescription: 1,
          likes: 1,
          comments: 1,
        },
      },
    ])
    .limit(1)
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
