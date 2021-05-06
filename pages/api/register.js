import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        await db
          .collection("useData")
          .insertOne({
            username: req.body.username.toLowerCase(),
            email: req.body.email,
            name: req.body.name,
            password: hash,
            image: "",
            dateCreated: new Date(),
            dateUpdated: new Date(),
            profile: "",
            profiles: [""],
            passwords: [hash],
            usernames: [req.body.username],
            followers: [],
            following: [],
            bookmarked: [],
            posts: [],
            viewedPosts: [],
            viewedProfiles: [],
            tags: [],
            viewedTypes: [],
            liked: [],
          })
          .then((e) => {
            return e;
          })
          .then((e) => {
            res.status(200).json({
              status: "success",
              value: {
                _id: e.ops[0]._id,
                username: e.ops[0].username,
              },
            });
          });
      });
    });
  } else {
    res.status(404).send({ status: "error", value: "wrong method" });
  }
};
