import { Button, Checkbox, Chip, Divider, Link, Rating, Stack } from '@mui/material';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoShareSocial } from 'react-icons/io5';
import { CartPlusIcon, HeartIcon } from '@icons';
import { Quantity } from '@common/components';
import { format } from '@common/utils';

const ProductMain = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Stack gap={2}>
      <div>
        <Chip label="MỚI" color="info" size="small" />
      </div>
      <h5 className="text-xl font-bold">Foundations Matte Flip Flop</h5>
      <Stack direction="row" alignItems="center">
        <Rating readOnly value={4.5} precision={0.25} />
        <span className="text-sm text-fade">(20 đánh giá)</span>
      </Stack>
      <span className="text-xl font-bold">{format.price(120000)}</span>
      <p className="text-sm text-fade">
        Với thiết kế gợn sóng nguyên bản lấy cảm hứng từ tàu cao tốc Nhật Bản, Nike Air Max 97 cho phép bạn đẩy mạnh
        phong cách của mình về phía trước.
      </p>
      <Divider style={{ borderStyle: 'dashed' }} />
      <Stack direction="row">
        <span className="flex-1 text-sm font-semibold">Số lượng</span>
        <Quantity value={quantity} available={74} onChange={setQuantity} />
      </Stack>
      <Divider style={{ borderStyle: 'dashed' }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <Button size="large" fullWidth color="warning" startIcon={<CartPlusIcon />}>
          Thêm vào giỏ hàng
        </Button>
        <Button size="large" fullWidth>
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
    </Stack>
  );
};

export default ProductMain;
