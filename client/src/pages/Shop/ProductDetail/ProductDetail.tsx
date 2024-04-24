import { useState } from 'react';
import { Breadcrumbs, Button, Chip, Container, Divider, Link, Rating, Stack } from '@mui/material';
import ProductSlide from './ProductSlide';
import Quantity from '~/components/Quantity';
import config from '~/config';
import { formatPrice } from '~/utils/format';
import { AddToCartIcon } from '~/components/Icons';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(3);

  return (
    <div className="pt-16 md:pt-20">
      <Container className="mt-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          <div className="col-span-1 p-3 lg:col-span-7 lg:p-5 xl:p-8">
            <ProductSlide />
          </div>
          <div className="col-span-1 p-3 lg:col-span-5 lg:p-5 xl:p-8">
            <Stack gap={2}>
              <div>
                <Chip label="MỚI" color="info" size="small" />
              </div>
              <h5 className="text-xl font-bold">Foundations Matte Flip Flop</h5>
              <Stack direction="row" alignItems="center">
                <Rating readOnly value={4.5} precision={0.25} />
                <span className="text-sm text-fade">(20 đánh giá)</span>
              </Stack>
              <span className="text-xl font-bold">{formatPrice(120000)}</span>
              <p className="text-sm text-fade">
                Với thiết kế gợn sóng nguyên bản lấy cảm hứng từ tàu cao tốc Nhật Bản, Nike Air Max 97 cho phép bạn đẩy
                mạnh phong cách của mình về phía trước.
              </p>
              <Divider style={{ borderStyle: 'dashed' }} />
              <Stack direction="row">
                <span className="flex-1 text-sm font-semibold">Số lượng</span>
                <Quantity value={quantity} available={74} onChange={setQuantity} />
              </Stack>
              <Divider style={{ borderStyle: 'dashed' }} />
              <Stack direction="row" gap={2}>
                <Button size="large" fullWidth color="primary" startIcon={<AddToCartIcon />}>
                  Thêm vào giỏ hàng
                </Button>
                <Button size="large" fullWidth>
                  Mua ngay
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
