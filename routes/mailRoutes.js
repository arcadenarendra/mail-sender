import { Router } from "express";
import transporter from "../config/mailer.js";
import validateMail from "../middleware/validateMail.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("mail");
});

router.post("/send", validateMail, async (req, res) => {
  try {
    const { from, subject, message } = req.body;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.MAIL}>`,
      to: process.env.MAIL,
      replyTo: from,
      subject,
      text: `
Sender Email: ${from}

Message:
${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.response);
    console.log({
        status: "success",
        message: "Email sent successfully.",
        data: {
            from,
            subject,
            message,
        },
    });
    res.render("success");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

export default router;
