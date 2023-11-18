const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmailNodemailer = asyncHandler(async (email, html, subject) => {
  if (!email) {
    throw new Error('No recipient email address provided');
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_NAME,
      pass: process.env.APP_PASSWORD_GMAIL,
    },
  });

  let info = await transporter.sendMail({
    from: '"Mạnh Tuấn Mobile" <no-reply@manhtuanmobile.com>',
    to: email, // Ensure that 'email' is correctly passed
    subject: subject,
    html: html,
  });
  return info;
});

module.exports = sendEmailNodemailer



