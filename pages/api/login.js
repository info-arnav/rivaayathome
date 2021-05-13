import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    const user = await db
      .collection("userData")
      .find({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      })
      .limit(1)
      .toArray();
    !user[0]
      ? res
          .status(202)
          .send({ status: "error", value: "username or email does not exist" })
      : bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (result) {
              res.status(200).send({
                status: "success",
                value: {
                  _id: user[0]._id,
                  username: user[0].username,
                },
              });
            } else {
              res
                .status(202)
                .send({ status: "error", value: "incorrect password" });
            }
          }
        );
  } else {
    res.status(202).json({ error: "wrong method" });
  }
};
