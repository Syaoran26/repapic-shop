import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Navigation } from 'swiper/modules';
import api from '~/config/api';
import { toast } from 'react-toastify';
import { constants } from '@common/utils';

const slideVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

interface ProductCarouselProps {
  query?: string;
}

const ProductCarousel: FC<ProductCarouselProps> = ({ query = '' }) => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    api
      .get(`/products?${query}`)
      .then((res) => setProducts(res.data.products))
      .catch(() => toast.error(constants.sthWentWrong));
  });

  return (
    <div>
      <Swiper
        wrapperClass="py-5"
        slidesPerView={1}
        navigation={true}
        spaceBetween={10}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {products
          ? products.map((product, index) => (
              <SwiperSlide key={index}>
                <motion.div variants={slideVariants} initial="initial" whileInView="animate">
                  <ProductCard data={product} />
                </motion.div>
              </SwiperSlide>
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <SwiperSlide key={index}>
                <motion.div variants={slideVariants} initial="initial" whileInView="animate">
                  <ProductCardSkeleton />
                </motion.div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
