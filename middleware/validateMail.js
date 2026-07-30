export default function validateMail(req, res, next) {
  const name = String(req.body?.name ?? "").trim();
  const from = String(req.body?.from ?? "").trim();
  const message = String(req.body?.message ?? "").trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !from || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (name.length > 100 || from.length > 254 || message.length > 5000) {
    return res.status(400).json({
      success: false,
      message: "One or more fields are too long.",
    });
  }

  if (!emailPattern.test(from)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  req.body = { name, from, message };

  next();
}