import "./env.js";
import nodemailer from "nodemailer";

function requireEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required for SMTP configuration.`);
  }

  return value;
}

const mailUser = requireEnv("MAIL");
const mailPassword = requireEnv("PASS");
const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number.isNaN(smtpPort) ? 587 : smtpPort,
  secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
  auth: {
    user: mailUser,
    pass: mailPassword,
  },
});

export default transporter;