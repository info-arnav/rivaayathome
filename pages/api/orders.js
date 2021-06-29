import { ObjectID } from "bson";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if (req.method != "POST") {
    res.send({ status: "error", value: "wrong method" });
  } else {
    const { db } = await connectToDatabase();
    let id = [];
    req.body.id.map((e) => id.push(ObjectID(e)));
    db.collection("posts")
      .update(
        { _id: { $in: id } },
        { $pull: { cart: { username: req.body.username } } }
      )
      .then(
        async (e) =>
          await db
            .collection("posts")
            .update(
              { _id: { $in: id } },
              {
                $push: {
                  orders: { username: req.body.username, quantity: 1 },
                },
              }
            )
            .then((e) => res.send({ status: "surccess", message: "edited" }))
      );
  }
};
