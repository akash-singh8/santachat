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
    subject: "Welcome to SANTaCHAT - Verify your account and start chatting!",
    html: `
        <p>Thanks for joining SANTaCHAT! To unlock all the exciting features and start connecting with others, just one quick step is left: verify your account.</p>
        <p>Click the link below to confirm your email address and activate your profile:</p>

        <a href="${link}" target="_blank">${link?.slice(0, 60)}</a>

        <div>
          <p>This link will be valid for 5 minutes. Once verified, you'll be able to:</p>
          <ul>
            <li>Connect with other Santas and fellow holiday enthusiasts</li>
            <li>Join lively conversations and share the holiday spirit</li>
            <li>And much more!</li>
          </ul>
        </div>

        <p>We can't wait to welcome you to the SANTaCHAT community!</p>

        <br>
        
        <div>
          <p>Warmly,</p>
          <p>The SANTaCHAT Team</p>
        </div>
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
