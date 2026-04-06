import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    secure: false, // required for Mailtrap
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // ✅ THIS FIXES 535 ERROR
    },
  });

  await transporter.sendMail({
    from: "hello@musicapp.com",
    to,
    subject,
    html,
  });
};

export default sendMail;






