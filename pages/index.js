import Link from "next/link";
import Head from "../components/head";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ status, posts, notFound }) {
  return (
    <div>
      <Head></Head>

      {!notFound && (
        // Manage home page layout here

        <div className={"masonry-with-columns"}>
          {posts.map((e) => (
            <div
              style={{
                width: "100%",
                marginBottom: "5px",

                boxShadow:
                  "0 0 1px 0 rgb(8 11 14 / 6%), 0 3px 3px -1px rgb(8 11 14 / 10%)",
                border: "solid",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "20px 20px 0 0px",
                }}
              >
                <img
                  data-src={`/api/image\/post\\${e._id}`}
                  src={e.compressed}
                  className="lazyload blur-up"
                  style={{
                    width: "100%",

                    borderRadius: "20px 20px 0 0px",
                    width: "100%",
                  }}
                ></img>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                wewe
              </div>
            </div>
          ))}
        </div>
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
