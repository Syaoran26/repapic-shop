import { FC, memo, useEffect, useState } from 'react';
import { Checkbox, IconButton, Link, Paper, Skeleton, SxProps, Tooltip } from '@mui/material';
import { CartPlusIcon, HeartIcon } from './Icons';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa6';
import Product from '~/types/ProductType';
import { formatPrice } from '~/utils/format';
import { toast } from 'react-toastify';
import Image from './Image';

const actionVariants = {
  initial: {
    x: -40,
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.25,
      staggerChildren: 0.1,
    },
  },
};

interface ProductCardProps {
  data: Product;
}

const buttonStyles: SxProps = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',

  '&:hover': {
    backgroundColor: 'white',
  },
};

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = () => {
    toast.success('Đã thêm sản phẩm vào giỏ hàng');
  };

  return (
    <Paper onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)}>
      <div className="p-2">
        <div className="relative overflow-hidden">
          <Image src={data.thumbnail} alt={data.name} effect="blur" rounded="xl" />
          <motion.div
            className="absolute flex flex-col gap-2 left-1 top-1"
            variants={actionVariants}
            animate={hover || isMobile ? 'animate' : 'initial'}
          >
            <motion.span variants={actionVariants}>
              <Tooltip title="Yêu thích" placement="right" arrow>
                <Checkbox
                  icon={<HeartIcon />}
                  checkedIcon={<HeartIcon />}
                  color="error"
                  size="small"
                  sx={buttonStyles}
                />
              </Tooltip>
            </motion.span>
            <motion.span variants={actionVariants}>
              <Tooltip title="Thêm giỏ hàng" placement="right" arrow>
                <IconButton size="small" sx={buttonStyles} onClick={handleAddToCart}>
                  <CartPlusIcon />
                </IconButton>
              </Tooltip>
            </motion.span>
            <motion.span variants={actionVariants}>
              <Tooltip title="Xem nhanh" placement="right" arrow>
                <IconButton size="small" sx={buttonStyles}>
                  <FaEye />
                </IconButton>
              </Tooltip>
            </motion.span>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 pt-4 pb-6">
        <Link color="inherit" fontWeight={600}>
          {data.name}
        </Link>
        <div className="flex justify-end gap-1 font-semibold">
          <del className="text-fader"></del>
          <span>{formatPrice(data.price)}</span>
        </div>
      </div>
    </Paper>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <Paper>
      <div className="p-2">
        <div className="relative pb-[100%] overflow-hidden rounded-xl">
          <Skeleton variant="rounded" className="absolute top-0 left-0" width="100%" height="100%" />
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 pt-4 pb-6">
        <Skeleton variant="text" width="45%" />
        <Skeleton variant="text" width="25%" className="self-end" />
      </div>
    </Paper>
  );
};

export default memo(ProductCard);
