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
              <center>
                <h4>About Us</h4>
                <br></br>
                <hr></hr>
                <br></br>
                <p>
                  Rivaayat, an initiative by CDF-SRCC to uplift the artisans who
                  toil to pursue their beautiful art form, thereby preserving
                  our cultural heritage, putting their heart and soul on passing
                  our country's legacy to the next generation.
                </p>
              </center>
              <br></br>
              <br></br>
              <center>
                <h4>Collections</h4>
              </center>
              <br></br>
              <hr></hr>
              <br></br>
              <center>
                <figure
                  className="ais-Hits-item"
                  onClick={() => location.replace(`/aqua`)}
                >
                  <img
                    src={`https://cdn.shopify.com/s/files/1/0497/3582/7613/products/DinnerSetPlate_720x.jpg?v=1622901757`}
                  />
                  <figcaption>Aqua</figcaption>
                </figure>
                <figure
                  className="ais-Hits-item"
                  onClick={() => location.replace(`/cookware`)}
                >
                  <img
                    src={`https://cdn.shopify.com/s/files/1/0497/3582/7613/products/ClayJug2_370x.jpg?v=1622901242`}
                  />
                  <figcaption>Cookware</figcaption>
                </figure>
                <figure
                  className="ais-Hits-item"
                  onClick={() => location.replace(`/dinnerware`)}
                >
                  <img src="https://cdn.shopify.com/s/files/1/0497/3582/7613/products/biryanihandiset_370x.png?v=1613134183" />
                  <figcaption>Dinnerware</figcaption>
                </figure>
              </center>
              <br></br>
              <br></br>
              <center>
                <h4>Best Sellers</h4>
              </center>
              <br></br>
              <hr></hr>
              <br></br>
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
      { $match: { category: "bestsellers" } },
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
