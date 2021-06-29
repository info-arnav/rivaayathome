import { connectToDatabase } from "./../../util/mongodb";
export default async function (req, res) {
  const { db } = await connectToDatabase();
  res.send(await db.collection("posts").find({}).toArray());
}
