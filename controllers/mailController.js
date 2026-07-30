import { sendPortfolioMail } from "../services/sendMail.js";

export async function sendMail(req, res) {
  const { name, from, message } = req.body;

  try {
    await sendPortfolioMail({ name, from, message });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
}