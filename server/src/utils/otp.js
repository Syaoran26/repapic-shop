import sendEmail from './email.js';

export const generateOTP = () => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

export const sendOTP = async (email, otp) => {
  await sendEmail({
    email: email,
    subject: '[Repapic] Xác thực mã OTP',
    message: `Mã xác nhận của bạn là ${otp}`,
  });
};
