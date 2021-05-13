import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if (req.method != "POST") {
    res.send({ status: "error", value: "wrong method" });
  } else {
    const { db } = await connectToDatabase();
    db.collection("userData")
      .updateOne(
        { username: req.body.username },
        {
          $set: {
            image: req.body.image,
          },
        }
      )
      .then((e) => res.send({ status: "surccess", message: "edited" }));
  }
};
