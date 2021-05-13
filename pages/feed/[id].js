import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FileResizer from "react-image-file-resizer";
import axios from "axios";
import Head from "../../components/head";
import { connectToDatabase } from "../../util/mongodb";

export default function dashboard({ status, username, posts, notFound }) {
  let router = useRouter();
  useEffect(() => status == "loggedOut" && router.push("/"));

  return (
    <div>
      <Head></Head>
      {!notFound && posts.map((e) => e.title)}
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
