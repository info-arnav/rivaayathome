import Link from "next/link";
import Head from "../../components/head";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from "next/router";
import ProfileSelf from "../../components/profile-self";
import ProfileOther from "../../components/profile-others";

export default function Home({
  status,
  users,
  notFound,
  username,
  profile,
  email,
  instagram,
  facebook,
  twitter,
  linkedin,
  website,
  github,
}) {
  const router = useRouter();
  return (
    <div>
      {username != users[0].username ? (
        <div>
          <Head
            url={`https://www.daisforall.com/profile/${users[0].username}`}
            title={`DaisForAll | Profile | ${users[0].username}`}
          ></Head>
          <ProfileOther
            username={users[0].username}
            name={users[0].name}
            profile={users[0].profile}
            email={users[0].email}
            instagram={users[0].instagram}
            facbook={users[0].facebook}
            twitter={users[0].twitter}
            linkedin={users[0].linkedin}
            github={users[0].github}
            website={users[0].website}
            followers={users[0].followers}
            Following={users[0].following}
            images={`/api/image/user/${users[0].username}`}
            posts={users[0].posts.length}
          ></ProfileOther>
        </div>
      ) : (
        <div>
          <Head
            url={`https://www.daisforall.com/profile/${users[0].username}`}
            title={`DaisForAll | Your Profile`}
          ></Head>
          <ProfileSelf
            username={username}
            name={users[0].name}
            profile={users[0].profile}
            email={users[0].email}
            instagram={users[0].instagram}
            facbook={users[0].facebook}
            twitter={users[0].twitter}
            linkedin={users[0].linkedin}
            github={users[0].github}
            website={users[0].website}
            followers={users[0].followers}
            Following={users[0].following}
            images={`/api/image/user/${username}`}
            posts={users[0].posts.length}
          ></ProfileSelf>
          <br></br>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("userData")
    .aggregate([
      { $match: { username: params.id } },
      {
        $project: {
          username: 1,
          name: 1,
          profile: 1,
          email: 1,
          instagram: 1,
          facebook: 1,
          twitter: 1,
          linkedin: 1,
          website: 1,
          github: 1,
          twitter: 1,
          followers: true,
          following: "Sa",
          posts: 1,
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
      users: JSON.parse(JSON.stringify(data)),
    },
  };
}
