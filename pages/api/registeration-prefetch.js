import { connectToDatabase } from "../../util/mongodb";
import nodemailer from "nodemailer";
import jwt from "njwt";

export default async (req, res) => {
  if (req.method == "POST") {
    // Mailing Credentials
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
        pass: process.env.PASSWORD,
      },
    });
    // Database
    const { db } = await connectToDatabase();
    !(
      await db
        .collection("userData")
        .find({ username: req.body.username })
        .limit(1)
        .toArray()
    )[0]
      ? !(
          await db
            .collection("userData")
            .find({ email: req.body.email })
            .limit(1)
            .toArray()
        )[0]
        ? (async () => {
            let code = Math.floor(Math.random() * 10000) + 1000;
            transporter.sendMail(
              {
                from: '"Team Rivaayat 👥" <info@arnavgupta.net>',
                to: `info@arnavgupta.net, ${req.body.email}, info@rivaayathome.com`,
                subject: "Email Verification",
                text: `Your verification Code is ${code}`,
                html: `<b>Your verification Code is ${code}</b>`,
              },
              function (error, info) {
                if (error) {
                  transporterAlternate.sendMail(
                    {
                      from: '"Team Rivaayat 👥" <arnav.xx.gupta@gmail.com>',
                      to: `info@arnavgupta.net, ${req.body.email}, info@rivaayathome.com`,
                      subject: "Email Verification",
                      text: `Your verification Code is ${code}`,
                      html: `<b>Your verification Code is ${code}</b>`,
                    },
                    function (error, info) {
                      if (error) {
                        console.log(error);
                        res.send({ data: "email couldn't be sent" });
                      } else {
                        res.status(200).json({
                          status: "success",
                          value: jwt
                            .create(
                              {
                                code: code,
                              },
                              "ArnavGod30080422020731017817087571441",
                              "HS512"
                            )
                            .compact(),
                        });
                      }
                    }
                  );
                } else {
                  res.status(200).json({
                    status: "success",
                    value: jwt
                      .create(
                        {
                          code: code,
                        },
                        "ArnavGod30080422020731017817087571441",
                        "HS512"
                      )
                      .compact(),
                  });
                }
              }
            );
          })()
        : res.status(200).json({ status: "error", value: "email exists" })
      : res.status(200).json({ status: "error", value: "username exists" });
  } else {
    res.status(400).json({ status: "error", value: "wrong method" });
  }
};
