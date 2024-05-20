import { MouseEvent, useState } from 'react';
import { Button, Checkbox, Chip, Divider, Link, Rating, Stack } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { IoShareSocial } from 'react-icons/io5';
import { CartPlusIcon, HeartIcon } from '@icons';
import { Quantity } from '@common/components';
import { format } from '@common/utils';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { addToCart } from '~/features/cart/cartSlice';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const ProductMain = () => {
  const { product, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = (buyNow: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
    if (product) {
      dispatch(addToCart({ product: product, quantity: quantity }));
      if (buyNow) {
        navigate(config.routes.cart);
      }
    }
  };

  return (
    <Stack gap={2}>
      {product && !isLoading && (
        <>
          <div>
            <Chip label="MỚI" color="info" size="small" />
          </div>
          <h5 className="text-xl font-bold">{product.title}</h5>
          <Stack direction="row" alignItems="center">
            <Rating readOnly value={product.rating} precision={0.25} />
            <span className="text-sm text-fade">(0 đánh giá)</span>
          </Stack>
          <span className="text-xl font-bold">{format.price(product.price, product.discount)}</span>
          <p className="text-sm text-fade">{product.description}</p>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Stack direction="row">
            <span className="flex-1 text-sm font-semibold">Số lượng</span>
            <Quantity value={quantity} available={product.stock} onChange={setQuantity} />
          </Stack>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button
              size="large"
              fullWidth
              color="warning"
              startIcon={<CartPlusIcon />}
              onClick={handleAddToCart(false)}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button size="large" fullWidth onClick={handleAddToCart(true)}>
              Mua ngay
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="center" gap={3} className="text-sm text-fade">
            <Link className="flex items-center gap-2" color="inherit">
              <FiPlus /> So sánh
            </Link>
            <span className="flex items-center">
              <Checkbox
                icon={<HeartIcon width={16} height={16} />}
                checkedIcon={<HeartIcon width={16} height={16} />}
                color="error"
                size="small"
              />
              <Link color="inherit">Yêu thích</Link>
            </span>
            <Link className="flex items-center gap-2" color="inherit">
              <IoShareSocial /> Chia sẻ
            </Link>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ProductMain;
