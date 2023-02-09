import twilio from "twilio";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const sendPhoneMessage = ({ alerts, phone }) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const sender_number = process.env.SENDER_NUMBER;
  const client = new twilio(accountSid, authToken);

  const msg = `Be Alert! There is possibility of Natural Disasters-${alerts.toString()}`;

  client.messages
    .create({
      body: msg,
      to: phone,
      from: sender_number,
    })
    .then((message) => console.log(message.sid))
    .done();
};

const sendEmail = ({ alerts, email }) => {
  const sender_email = process.env.SENDER_EMAIL;
  sgMail.setApiKey(process.env.TWILIO_SGID_MAIL_API_KEY);
  const msg = {
    to: email,
    from: sender_email,
    subject: "Disaster Alert!",
    text: `Be alert! There is possibility of natural disasters-${alerts.toString()}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendPhoneMessage, sendEmail };
