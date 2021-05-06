import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    await db
      .collection("posts")
      .update(
        { _id: req.body.post },
        { $push: { views: { data: new Date(), user: req.body.user } } }
      )
      .then(
        async (e) =>
          await db
            .collection("userData")
            .update(
              { username: req.body.user },
              {
                $push: {
                  viewedPosts: { data: new Date(), post: req.body.post },
                },
              }
            )
            .then((e) => res.status(200).send("done"))
      );
  } else {
    res.status(404).send("error");
  }
};
