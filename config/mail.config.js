import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
} from "../config/env.config.js";

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

async function send_mail(mail_to, mail_subject, mail_body) {
  const logo = `<img src="https://mail-track-eight.vercel.app/api/logo?email=${encodeURIComponent(mail_to)}" style="display:none;" />`;
  const link = `<a href="https://mail-track-eight.vercel.app/api/logo?email=${encodeURIComponent(mail_to)} onclick="event.preventDefault(); fetch(this.href);"" target="_blank" rel="noopener noreferrer" title="Visit Example">
  Open logo
</a>`
  const mailOptions = {
    from: MAIL_USER,
    to: mail_to,
    subject: mail_subject,
    html: `
        ${logo}
        ${mail_body}
        <br>
        ${link}
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error", error);
  }
}

export default send_mail;
