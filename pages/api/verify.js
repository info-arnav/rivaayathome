export default async (req, res) => {
  if (req.method == "POST") {
    const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    return fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=6LcM8JQaAAAAANE5B1sZchi2IrljEHNtQPo8Ioml&response=${req.body.response}`,
    })
      .then((response) => response.json())
      .then((data) => {
        res.send({ status: "success", value: data });
      });
  } else {
    res.status(404).send({ status: "error", value: "wrong method" });
  }
};
