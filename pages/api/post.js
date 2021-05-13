import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const data = {
    title: req.body.title,
    username: req.body.username,
    tags: req.body.tags,
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
  };
  const { db } = await connectToDatabase();
  db.collection("posts")
    .insertOne(data)
    .then((e) => res.send(e._id));
};
