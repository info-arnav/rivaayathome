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
          $set: {
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            linkedin: req.body.linkedin,
            website: req.body.website,
            github: req.body.github,
            profile: req.body.about,
          },
        }
      )
      .then((e) => res.send({ status: "surccess", message: "edited" }));
  }
};
