import sendEmail from '../../utils/email.js';
import { ErrorWithStatus } from '../../utils/error.js';

const generateOTP = () => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const sendOTP = async (email, otp) => {
  await sendEmail({
    email: email,
    subject: 'Cài lại mật khẩu (OTP hợp lệ trong 4 phút)',
    message: `Mã Xác Nhận: ${otp}`,
  });
};

export default { generateOTP, sendOTP };
