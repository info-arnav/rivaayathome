import { connectToDatabase } from "../../util/mongodb";
const algoliasearch = require("algoliasearch");

export default async (req, res) => {
  const client = algoliasearch(
    "ZJLJW3f57V",
    "579d5c5baabf986a6e084d24329b9b5f"
  );
  const index = client.initIndex("dev_PRODUCTS");
  const data = {
    title: req.body.title,
    username: req.body.username,
    tags: req.body.tag,
    compressed: req.body.compressed,
    blog: req.body.blog,
    image: req.body.image,
    conditions: req.body.conditions,
    computerProgramme: req.body.computerProgramme,
    bookmarks: [],
    views: [],
    likes: [],
    dateCreated: new Date(),
    dateUpdated: new Date(),
    cart: [],
    orders: [],
  };
  const { db } = await connectToDatabase();
  db.collection("posts")
    .insertOne(data)
    .then((e) => {
      res.send(e);
    });
};
