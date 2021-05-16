import Link from "next/link";
import Head from "../components/head";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ status, posts, notFound }) {
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
    <div>
      <Head></Head>

      {!notFound && (
        // Manage home page layout here
        <div>
          <div class=" mt-5">
            <div class="">
              <div class="col-12">
                <article class="blog-card">
                  <div class="blog-card__background">
                    <div class="card__background--wrapper">
                      <div
                        class="card__background--main"
                        style={{
                          "background-image": `url(api/image/post/${posts[0]._id})`,
                        }}
                      >
                        <div class="card__background--layer"></div>
                      </div>
                    </div>
                  </div>
                  <div class="blog-card__head">
                    <span class="date__box">
                      <span class="date__day">{posts[0].dateUpdated}</span>
                    </span>
                  </div>
                  <div class="blog-card__info" style={{ border: "solid" }}>
                    <h5>{posts[0].title}</h5>
                    <p>
                      <a href="#" class="icon-link mr-3">
                        <i
                          style={{ backgroundColor: "white" }}
                          class="fa fa-pencil-square-o"
                        ></i>{" "}
                        {posts[0].username}
                      </a>
                      <a href="#" class="icon-link">
                        {parseInt(
                          posts[0].blog.replace(/<[^>]*>/g, "").length / 190
                        )}{" "}
                        min read
                      </a>
                    </p>
                    <p>
                      <br></br>
                      {`DaisForAll | ${posts[0].blog
                        .replace(/<[^>]*>/g, "")
                        .slice(0, 500)}....`}
                    </p>
                    <br></br>
                    <a
                      href={`article/${posts[0]._id}`}
                      class="btn btn--with-icon"
                    >
                      <i class="btn-icon fa fa-long-arrow-right"></i>
                      READ MORE
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <section class="detail-page">
            <div class="container mt-5"></div>
          </section>
          <div className={"masonry-with-columns"}>
            {posts.splice(1, 21).map((e) => (
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
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: 5,
                      "flex-wrap": "wrap",
                      display: "inline-flex",
                    }}
                  >
                    {e.tags
                      .replaceAll("#", " ")
                      .replaceAll(",", " ")
                      .replaceAll("  ", " ")
                      .split(" ")
                      .map(
                        (e) =>
                          e && (
                            <div
                              style={{
                                margin: 1,
                                padding: 10,
                                fontSize: 11,
                                borderRadius: 5,
                                color: "white",
                                fontWeight: "bold",
                                backgroundColor:
                                  color[
                                    parseInt(e[0]) ||
                                      (e.charCodeAt(0) - 72).toString()[0] | 0
                                  ],
                              }}
                            >
                              #{e}
                            </div>
                          )
                      )}
                  </div>{" "}
                  <h5 style={{ marginBottom: "5px" }}>{e.title}</h5>
                  <h6 style={{ marginBottom: "5px" }}>{e.username}</h6>
                  <p
                    style={{ fontSize: "14px", marginBottom: "5px" }}
                  >{`DaisForAll | ${e.blog
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 160)}....`}</p>
                  <p style={{ fontSize: "14px" }}>
                    {parseInt(e.blog.replace(/<[^>]*>/g, "").length / 190)} min
                    read
                  </p>
                </div>
              </div>
            ))}
          </div>
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
