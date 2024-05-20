import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';
import { Image } from '@common/components';
import { useAppSelector } from '~/app/hooks';

const ProductSlide = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const { product } = useAppSelector((state) => state.product);
  const slides = product ? [product.thumbnail, ...product.images] : [];

  return (
    <>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-6 rounded-xl"
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide} alt={`${product?.title}-${index}`} effect="blur" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        centeredSlides
        loop
        slidesPerView={5.6}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="product-thumbs-slide"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide} alt={`${product?.title}-${index}`} effect="blur" rounded="xl" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlide;
