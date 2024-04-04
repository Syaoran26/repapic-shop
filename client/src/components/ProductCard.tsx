import { Checkbox, IconButton, Link, Paper, Tooltip } from '@mui/material';
import { CartPlusIcon, HeartIcon } from './Icons';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import Product from '~/types/ProductType';

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

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Paper onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)}>
      <div className="p-2">
        <div className="relative overflow-hidden">
          <img src={data.thumbnail} alt={data.name} className="object-cover w-full aspect-square rounded-xl" />
          <motion.div
            className="absolute flex flex-col gap-1 left-1 top-1"
            variants={actionVariants}
            animate={hover ? 'animate' : 'initial'}
          >
            <motion.span variants={actionVariants}>
              <Tooltip title="Yêu thích" placement="right" arrow>
                <Checkbox icon={<HeartIcon />} checkedIcon={<HeartIcon />} color="error" size="small" />
              </Tooltip>
            </motion.span>
            <motion.span variants={actionVariants}>
              <Tooltip title="Thêm giỏ hàng" placement="right" arrow>
                <IconButton size="small">
                  <CartPlusIcon />
                </IconButton>
              </Tooltip>
            </motion.span>
            <motion.span variants={actionVariants}>
              <Tooltip title="Xem nhanh" placement="right" arrow>
                <IconButton size="small">
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

export default ProductCard;
