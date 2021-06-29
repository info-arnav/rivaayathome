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
          $push: {
            cart: { id: req.body.id, quantity: 1 },
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
                $push: {
                  cart: { username: req.body.username, quantity: 1 },
                },
              }
            )
            .then((e) => res.send({ status: "surccess", message: "edited" }))
      );
  }
};
