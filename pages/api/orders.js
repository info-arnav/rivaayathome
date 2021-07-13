import { ObjectID } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nodemailer from "nodemailer";
export default async (req, res) => {
  if (req.method != "POST") {
    res.send({ status: "error", value: "wrong method" });
  } else {
    const { db } = await connectToDatabase();
    let id = [];
    let string = "";
    req.body.id.map((e) => {
      id.push(ObjectID(e));
      string = string + `https://rivayaat.vercel.app/product/${e}, `;
    });
    console.log(id);
    let transporter = nodemailer.createTransport({
      host: "smtp.rediffmailpro.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@arnavgupta.net", // generated ethereal user
        pass: "God71441", // generated ethereal password
      },
    });
    let transporterAlternate = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: "arnav.xx.gupta@gmail.com",
        pass: "Arnav@300804",
      },
    });
    const object = await db
      .collection("userData")
      .find({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      })
      .limit(1)
      .toArray();
    transporter.sendMail(
      {
        from: '"Team Rivaayat 👥" <info@arnavgupta.net>',
        to: `info@arnavgupta.net, arnav.xx.gupta@gmail.com, ${object[0].email}, info@rivaayathome.com`,
        subject: "Order Places",
        text: `Order for the following has been placed. ${string}at ${req.body.address}`,
        html: `<b>Order for the following has been placed.<br>${string}at ${req.body.address}</b>`,
      },
      function (error, info) {
        if (error) {
          transporterAlternate.sendMail({
            from: '"Team Rivaayat 👥" <arnav.xx.gupta@gmail.com>',
            to: `info@arnavgupta.net, arnav.xx.gupta@gmail.com, ${oject[0].email}, info@rivaayathome.com`,
            subject: "Order Places",
            text: `Order for the following has been placed. ${string}at ${req.body.address}`,
            html: `<b>Order for the following has been placed.<br>${string}at ${req.body.address}</b>`,
          });
        }
      }
    );
    db.collection("posts")
      .updateMany(
        { _id: { $in: id } },
        { $pull: { cart: { username: req.body.username } } }
      )
      .then(
        async (e) =>
          await db
            .collection("posts")
            .updateMany(
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
