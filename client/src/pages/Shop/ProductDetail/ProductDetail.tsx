import { Breadcrumbs, Container, Link } from '@mui/material';
import config from '~/config';
import ProductSlide from './ProductSlide';
import ProductMain from './ProductMain';
import ProductTabs from './ProductTabs';
import { IoCard, IoGift } from 'react-icons/io5';
import { FaHeadphones } from 'react-icons/fa6';
import { BiSolidDiscount } from 'react-icons/bi';

const ProductDetail = () => {
  return (
    <div className="pt-16 md:pt-20">
      <Container className="mt-10 mb-[120px]">
        <div className="mb-10">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href={config.routes.home}>
              Trang chủ
            </Link>
            <Link color="inherit" href={config.routes.shop}>
              Cửa hàng
            </Link>
            <Link color="inherit">Danh mục</Link>
            <span>Tên sản phẩm</span>
          </Breadcrumbs>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-12 xl:gap-16">
          <div className="col-span-1 xl:col-span-7">
            <ProductSlide />
          </div>
          <div className="col-span-1 xl:col-span-5">
            <ProductMain />
          </div>
        </div>
        <div className="grid gap-10 my-20 md:grid-cols-2 lg:grid-cols-4">
          <div className="px-8 text-center">
            <FaHeadphones className="inline-block text-primary" size={32} />
            <h6 className="mt-2 mb-1 font-semibold">Hỗ trợ 24/7</h6>
            <p className="text-sm text-fade">Mua sắm với những sự tư vấn của chúng tôi</p>
          </div>
          <div className="px-8 text-center">
            <IoGift className="inline-block text-primary" size={32} />
            <h6 className="mt-2 mb-1 font-semibold">Ưu đãi bất ngờ hàng ngày</h6>
            <p className="text-sm text-fade">Có cơ hội nhận được ưu đãi và tiết kiệm tới 20%</p>
          </div>
          <div className="px-8 text-center">
            <BiSolidDiscount className="inline-block text-primary" size={32} />
            <h6 className="mt-2 mb-1 font-semibold">Giá cả phải chăng</h6>
            <p className="text-sm text-fade">Sản phẩm được làm thủ công trực tiếp tại xưởng</p>
          </div>
          <div className="px-8 text-center">
            <IoCard className="inline-block text-primary" size={32} />
            <h6 className="mt-2 mb-1 font-semibold">Thanh toán bảo mật</h6>
            <p className="text-sm text-fade">Yên tâm thanh toán một cách tiện lợi</p>
          </div>
        </div>
        <ProductTabs />
      </Container>
    </div>
  );
};

export default ProductDetail;
