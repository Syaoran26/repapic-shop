import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import Product from '~/types/ProductType';
import { Navigation } from 'swiper/modules';

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

const PRODUCTS: Product[] = [
  {
    name: '(Couple) Tranh tự thiết kế',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/434148027_714882674165872_3538940495319741361_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6hn7x5AjzLoAX_tsIUG&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQtRCsJ_Vk3PbtJ_9iEPkvI2ofmV3BpIStWVOBn8hd37g&oe=662B6852',
    price: 120000,
  },
  {
    name: '(Nhóm bạn) Tranh tự thiết kế',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/433834116_388104714135339_2459108586136048718_n.png?stp=dst-png_s206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LXcpnMaHqBQAX9ML2N7&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTDflmK9WWuL9i5baulyxHDDkKIkauj8BvUnidYOTuc_A&oe=662B6B75',
    price: 120000,
  },
  {
    name: '(Gia đình) Tranh tự thiết kế',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/434047110_965301085155568_158716772500141359_n.png?stp=dst-png_p228x119&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2ggYDNhQiEQAX_lCqq6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT0mM_tg00ynkEAD0ZNyAFIK6_iotWcTIfLgbsV87xWgg&oe=662B9625',
    price: 120000,
  },
  {
    name: 'Voi tập thể dục',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/434044847_1780851085727850_8065446418772390909_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Kcgp-_RdZkIAX_Vjdpe&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT5Kb9ESchHKRwkrv4Xy68VG7U_-GNy1-9UkUDtzMEv8g&oe=662B6209',
    price: 100000,
  },
  {
    name: 'Gấu dâu dễ thương',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/434092368_3265626600410661_4782142575256774245_n.png?stp=dst-png_s240x240&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5I39F3g5S9cAX-zQ2no&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQgJpuw2-TN_qTFytUUEtQhF9wb7LsSZdYQRFqX6A4EUw&oe=662B91C1',
    price: 100000,
  },
  {
    name: 'Kuromi đáng yêu',
    thumbnail:
      'https://scontent.xx.fbcdn.net/v/t1.15752-9/433972679_1087283392544667_247024302327811928_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vYahkHh03bMAX9RpxC6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSd9p3_JJFnElE0mZo2D8RrDs34ICsReMW5wgqa5aqhWg&oe=662B8214',
    price: 100000,
  },
];

const ProductCarousel = () => {
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
        {PRODUCTS.map((product, index) => (
          <SwiperSlide key={index}>
            <motion.div variants={slideVariants} initial="initial" whileInView="animate">
              <ProductCard data={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
