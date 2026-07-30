import transporter from "../config/mailer.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendPortfolioMail({ name, from, message }) {
  const safeName = escapeHtml(name);
  const safeFrom = escapeHtml(from);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const mailOptions = {
    from: { name: "Portfolio Contact Form", address: process.env.MAIL },
    to: process.env.MAIL,
    replyTo: from,
    subject: "New Portfolio Contact",
    text: `Name:\n${name}\n\nEmail:\n${from}\n\nMessage:\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">New Portfolio Contact</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong><br />${safeName}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong><br />${safeFrom}</p>
        <p style="margin: 0;"><strong>Message:</strong><br />${safeMessage}</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}