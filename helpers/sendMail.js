const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const emailOptions = {
//   to: "mahera1071@syinxun.com",
//   from: "marydanyliuk@meta.ua",
//   subject: "Test email",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// };

const sendEmail = async (emailOptions) => {
  const email = { ...emailOptions, from: EMAIL_FROM };
  await transport.sendMail(email);
  return true;
};

// transporter
//   .sendMail(emailOptions)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// const sendEmail = async (data) => {
//   const email = { ...data, from: EMAIL_FROM };
//   await sgMail.send(emailOptions);
//   return true;
// };

module.exports = sendEmail;
