import Link from "next/link";
import Head from "../../components/head";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId, ObjectID } from "bson";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home({ status, posts, notFound, username }) {
  const routers = useRouter();
  useEffect(() => {
    if (!posts[0]) {
      routers.push("/404");
    }
  });
  const color = [
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
  ];
  return (
    <article>
      {posts[0] && (
        <div>
          <Head
            about={`Rivaayat | ${posts[0].blog
              .replace(/<[^>]*>/g, "")
              .slice(0, 160)}....`}
            title={`Rivaayat | ${posts[0].title}`}
          ></Head>{" "}
          <div class="containeras">
            <div class="grid product">
              <img
                width="100%"
                src={posts[0].compressed}
                data-src={`/api/image/post/${posts[0]._id}`}
                className="blur-up lazyload"
              />

              <div class="column-xs-12 column-md-5">
                <h1>{posts[0].title}</h1>
                <h2>{posts[0].tags}INR</h2>
                <div class="description">
                  <p dangerouslySetInnerHTML={{ __html: posts[0].blog }}></p>
                </div>
                <button
                  class="add-to-cart"
                  disabled={status != "loggedIn"}
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post("/api/cart", { username, id: posts[0]._id })
                      .then((e) => location.replace(`/dashboard/${username}`));
                  }}
                >
                  {status != "loggedIn" ? "Login to Add" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br></br>
    </article>
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
          name: true,
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
