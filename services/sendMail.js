import transporter from "../config/mailer.js";

export async function sendPortfolioMail({ name, from, message }) {
  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.MAIL}>`,
    to: process.env.MAIL,
    replyTo: from,
    subject: "New Portfolio Contact",
    text: `Name:\n${name}\n\nEmail:\n${from}\n\nMessage:\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">New Portfolio Contact</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong><br />${name}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong><br />${from}</p>
        <p style="margin: 0;"><strong>Message:</strong><br />${message}</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}