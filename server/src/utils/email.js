import nodemailer from 'nodemailer';
import { ErrorWithStatus } from './error.js';

const sendEmail = async function (options) {
  // 1> Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: 'Repapic Support',
      address: process.env.EMAIL_USERNAME,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new ErrorWithStatus(500, 'Có lỗi khi gửi email. Thử lại Sau!');
  }
};

export default sendEmail;
