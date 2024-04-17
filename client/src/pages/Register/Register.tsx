import { Link } from '@mui/material';

import config from '~/config';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <div className="w-full max-lg:bg-white max-lg:rounded-2xl max-lg:py-10 max-lg:px-6 max-lg:shadow-sm">
      <div className="mb-10">
        <h4 className="mb-4 text-xl lg:text-2xl font-bold leading-[1.5]">Bắt đầu hoàn toàn miễn phí</h4>
        <p className="text-sm">
          Bạn đã có tài khoản?{' '}
          <Link href={config.routes.login} underline="hover" fontWeight={600}>
            Đăng nhập ngay
          </Link>
        </p>
      </div>
      <RegisterForm />
      <p className="mt-5 text-xs text-center text-default">
        <span className="text-fade">Bằng cách đăng ký, tôi đồng ý với </span>
        <Link color="inherit" underline="always">
          Điều khoản dịch vụ
        </Link>
        <span className="text-fade"> và </span>
        <Link color="inherit" underline="always">
          Chính sách quyền riêng tư
        </Link>
        .
      </p>
    </div>
  );
};

export default Register;
