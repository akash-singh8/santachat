import nodemailer from "nodemailer";
import { generateLink } from "./linkHandler";

const sendEmail = (email: string) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_APP_PASSWORD,
    },
  });

  const link = generateLink(email);

  const mailDetails = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: email,
    subject: "Verify Your Account",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SANTaCHAT</title>
        <style>
            body {
            background-color: #F9F9F9;
            font-family: 'Arial', sans-serif;
            margin: 20px;
            }
            a {
            color: #007BFF;
            text-decoration: none;
            }
            a:hover {
            text-decoration: underline;
            }
            hr {
            border: 1px solid #DDD;
            margin: 20px 0;
            }
            strong, h3 {
            color: #B30738;
            }
        </style>
        </head>
        <body>
            <p>Dear User, Welcome to <strong>SANTaCHAT</strong></p>
            <p>To complete the account verification process, please click on the link below:</p>
            <a href="${link}" target="_blank">${link?.slice(0, 80)}</a>
            <p>This link is valid for 5 minutes only.</p>
            <hr>
            <h3>SANTaCHAT</h3>
        </body>
        </html>
      `,
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully send verification link to ${data.accepted}`);
    }
  });
};

export default sendEmail;
