import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FileResizer from "react-image-file-resizer";
import axios from "axios";
import Head from "../../components/head";
import { connectToDatabase } from "../../util/mongodb";

export default function feed({ status, username, posts, notFound }) {
  let router = useRouter();
  useEffect(() => status == "loggedOut" && router.push("/"));

  return (
    <div>
      <Head
        title="DaisForAll | Feed"
        about="View and manage all of your posts here."
      ></Head>
      {!notFound && (
        <div className={"masonry-with-columns"}>
          {posts.map((e) => (
            <div
              style={{
                width: "100%",
                marginBottom: 5,
                overflow: "hidden",

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
                  maxWidth: "350px",
                  borderRadius: "20px 20px 0 0px",
                }}
              >
                <img
                  data-src={`/api/image\/post\\${e._id}`}
                  src={e.compressed}
                  className="lazyload blur-up"
                  style={{
                    width: "100%",
                    maxWidth: "350px",
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

export async function getServerSideProps(params) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("posts")
    .aggregate([
      { $match: { username: params.params.id } },
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
