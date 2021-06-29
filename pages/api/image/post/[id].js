import { ObjectId } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function (req, res) {
  const { db } = await connectToDatabase();
  if (req.query.id.length == 24) {
    const image = await db
      .collection("posts")
      .aggregate([
        { $match: { _id: ObjectId(req.query.id) } },
        { $project: { image: 1 } },
      ])
      .limit(1)
      .toArray();
    if (image[0] && image[0].image) {
      const im = image[0].image.split(",")[1];
      const img = Buffer.from(im, "base64");
      res.writeHead(200, {
        "Content-Type": "image/webp",
        "Content-Length": img.length,
      });
      res.end(img);
    } else {
      const imagenew = await db
        .collection("emergency")
        .aggregate([
          { $match: { _id: ObjectId("60743b3ae474367382c95633") } },
          { $project: { image: 1 } },
        ])
        .limit(1)
        .toArray();
      const im = imagenew[0].image.split(",")[1];
      const img = Buffer.from(im, "base64");
      res.writeHead(200, {
        "Content-Type": "image/webp",
        "Content-Length": img.length,
      });
      res.end(img);
    }
  } else {
    res.send({ status: "error", value: "invalid id" });
  }
}
