import { Container, IconButton, Link, Tooltip } from '@mui/material';
import config from '../../config';
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoTiktok } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-white border-t">
      <Container>
        <Link href={config.routes.home}>
          <img src="/images/logo.png" alt="Repapic" className="h-20 max-lg:mx-auto" />
        </Link>
        <div className="flex items-center justify-between max-lg:flex-col gap-y-10">
          <div className="max-w-[270px]">
            <p className="text-sm max-lg:text-center">
              Ý tưởng từ những món đồ handmade kết hợp với ý thức bảo vệ môi trường, Repapic tạo nên set đồ chơi tô màu
              tranh từ giấy vụn tái chế
            </p>
            <div className="flex items-center mt-6 max-lg:justify-center">
              <Tooltip title="Follow trên Facebook" arrow>
                <IconButton sx={{ color: '#1877f2' }} component={Link} href="https://www.facebook.com/repapic">
                  <BiLogoFacebook />
                </IconButton>
              </Tooltip>
              <Tooltip title="Follow trên Instagram" arrow>
                <IconButton sx={{ color: '#e02d69' }}>
                  <BiLogoInstagramAlt />
                </IconButton>
              </Tooltip>
              <Tooltip title="Follow trên Tiktok" arrow>
                <IconButton sx={{ color: 'black' }}>
                  <BiLogoTiktok />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 text-sm max-md:grid-cols-1 max-md:text-center color-default">
            <div className="flex flex-col gap-4">
              <h6 className="font-bold uppercase">REPAPIC</h6>
              <Link color="inherit" href={config.routes.aboutUs}>
                Về chúng tôi
              </Link>
              <Link color="inherit" href={config.routes.contactUs}>
                Liên hệ
              </Link>
              <Link color="inherit">FAQs</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold uppercase">Pháp lý</h6>
              <Link color="inherit">Điều khoản và điều kiện</Link>
              <Link color="inherit">Chính sách bảo mật</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold uppercase">Liên hệ</h6>
              <Link color="inherit">repapic.support@gmail.com</Link>
              <Link color="inherit">0011 223 445</Link>
            </div>
          </div>
        </div>
        <p className="mt-20 text-sm text-center">
          Đã đăng ký bản quyền © 2024 <span className="text-primary">Repapic</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
