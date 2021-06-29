import { ObjectID } from "bson";
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
          $pull: {
            cart: { id: req.body.id },
          },
        }
      )
      .then(
        async (e) =>
          await db
            .collection("posts")
            .updateOne(
              { _id: ObjectID(req.body.id) },
              {
                $pull: {
                  cart: { username: req.body.username },
                },
              }
            )
            .then((e) => res.send({ status: "surccess", message: "edited" }))
      );
  }
};
