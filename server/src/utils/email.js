import nodemailer from 'nodemailer';
import { ErrorWithStatus } from '../../utils/error.js';

const sendEmail = async function (options) {
  // 1> Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "Less secure app" option
  });

  // 2> Define the email options
  const mailOptions = {
    from: {
      name: `Kiet Ngo`,
      address: process.env.EMAIL_USERNAME,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3> Actually send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new ErrorWithStatus(500, 'Có lỗi khi gửi email. Thử lại Sau!!');
  }
};

export default sendEmail;
