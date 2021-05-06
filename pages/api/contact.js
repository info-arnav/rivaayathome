import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    await db
      .collection("contact")
      .insertOne({
        message: req.body.message,
        email: req.body.email,
        date: new Date(),
      })
      .then((e) => res.status(200).send("message stored"));
  } else {
    res.status(404).send({ status: "error", value: "wrong method" });
  }
};
