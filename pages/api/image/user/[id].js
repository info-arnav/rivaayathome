import { connectToDatabase } from "../../../../util/mongodb";

export default async function (req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  let user = await db
    .collection("userData")
    .aggregate([{ $match: { username: id } }, { $project: { image: 1 } }])
    .limit(1)
    .toArray();
  if (user[0].image) {
    var data = user[0].image.split(",")[1];
    var img = Buffer.from(data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  } else {
    res.send({ status: "error", value: "no image" });
  }
}
