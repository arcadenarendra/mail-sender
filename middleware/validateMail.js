export default function validateMail(req, res, next) {
  const { from, subject, message } = req.body;

  if (!from || !subject || !message) {
    return res.status(400).send("All fields are required.");
  }

  next();
}