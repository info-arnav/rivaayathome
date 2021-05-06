import { ObjectId } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function (req, res) {
  const { db } = await connectToDatabase();
  const image = await db
    .collection("posts")
    .aggregate([
      { $match: { _id: ObjectId(req.query.id) } },
      { $project: { image: 1 } },
    ])
    .limit(1)
    .toArray();
  const im = image[0].image.split(",")[1];
  const img = Buffer.from(im, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length,
  });
  res.end(img);
}
