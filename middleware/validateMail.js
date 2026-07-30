export default function validateMail(req, res, next) {
  const { name, from, message } = req.body;

  if (!String(name || "").trim() || !String(from || "").trim() || !String(message || "").trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  next();
}