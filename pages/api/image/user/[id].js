import { ObjectId } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function (req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  let user = await db
    .collection("userData")
    .aggregate([{ $match: { username: id } }, { $project: { image: 1 } }])
    .limit(1)
    .toArray();
  if (user.image) {
    var data = user[0].image.split(",")[1];
    var img = Buffer.from(data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  } else {
    const image = await db
      .collection("emergency")
      .aggregate([
        { $match: { _id: ObjectId("60743b3ae474367382c95633") } },
        { $project: { userdp: 1 } },
      ])
      .limit(1)
      .toArray();
    const im = image[0].userdp.split(",")[1];
    const img = Buffer.from(im, "base64");
    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  }
}
