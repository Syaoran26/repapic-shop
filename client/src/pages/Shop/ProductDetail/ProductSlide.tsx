import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';
import Image from '~/components/Image';

const slideVariants = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
  'https://swiperjs.com/demos/images/nature-8.jpg',
  'https://swiperjs.com/demos/images/nature-9.jpg',
  'https://swiperjs.com/demos/images/nature-10.jpg',
];

const ProductSlide = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  return (
    <>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-6 rounded-xl"
      >
        {slideVariants.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide} alt="slide" effect="blur" />
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
        {slideVariants.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide} alt="slide" effect="blur" rounded="xl" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlide;
