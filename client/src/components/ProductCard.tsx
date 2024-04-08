import { Checkbox, IconButton, Link, Paper, SxProps, Tooltip } from '@mui/material';
import { CartPlusIcon, HeartIcon } from './Icons';
import { motion } from 'framer-motion';
import { FC, memo, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import Product from '~/types/ProductType';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

  return (
    <Paper onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)}>
      <div className="p-2">
        <div className="relative overflow-hidden rounded-xl">
          <LazyLoadImage
            src={data.thumbnail}
            alt={data.name}
            wrapperProps={{ style: { display: 'block' } }}
            wrapperClassName="relative pb-[100%]"
            className="absolute top-0 left-0 size-full"
            effect="blur"
          />
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
                <IconButton size="small" sx={buttonStyles}>
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
          <span>{data.price === 100000 ? '100.000đ' : '120.000đ'}</span>
        </div>
      </div>
    </Paper>
  );
};

export default memo(ProductCard);
