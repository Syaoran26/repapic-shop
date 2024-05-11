import { Button, Container } from '@mui/material';
import { ThunderIcon } from '@icons';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { CSSProperties } from 'react';

const textVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Carousel = () => {
  return (
    <div className="relative h-screen overflow-hidden background-3">
      <Swiper
        autoplay={{ delay: 6_000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay, Pagination]}
        effect="fade"
        pagination={{
          clickable: true,
        }}
        style={
          {
            '--swiper-pagination-color': 'var(--primary-color)',
            '--swiper-pagination-bullet-inactive-color': 'white',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '10px',
            '--swiper-pagination-bullet-border-radius': '10px',
          } as CSSProperties
        }
      >
        <SwiperSlide>
          <Container className="h-screen pt-20">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  BẢO VỆ MÔI TRƯỜNG
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Cute Puppy
                </motion.h3>
                <motion.p variants={textVariants}>Góp phần tái sử dụng giấy và rác thải</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src="/images/banners/banner-1.png"
                alt="Banner1"
                className="object-contain h-full"
                variants={imageVariants}
                initial="initial"
                whileInView="animate"
              />
            </div>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container className="h-screen pt-20">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  BẢO VỆ MÔI TRƯỜNG
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Cute Puppy
                </motion.h3>
                <motion.p variants={textVariants}>Góp phần tái sử dụng giấy và rác thải</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src="/images/banners/banner-1.png"
                alt="Banner1"
                className="object-contain h-full"
                variants={imageVariants}
                initial="initial"
                whileInView="animate"
              />
            </div>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container className="h-screen pt-20">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  BẢO VỆ MÔI TRƯỜNG
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Cute Puppy
                </motion.h3>
                <motion.p variants={textVariants}>Góp phần tái sử dụng giấy và rác thải</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src="/images/banners/banner-1.png"
                alt="Banner1"
                className="object-contain h-full"
                variants={imageVariants}
                initial="initial"
                whileInView="animate"
              />
            </div>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container className="h-screen pt-20">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  BẢO VỆ MÔI TRƯỜNG
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Cute Puppy
                </motion.h3>
                <motion.p variants={textVariants}>Góp phần tái sử dụng giấy và rác thải</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.img
                src="/images/banners/banner-1.png"
                alt="Banner1"
                className="object-contain h-full"
                variants={imageVariants}
                initial="initial"
                whileInView="animate"
              />
            </div>
          </Container>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
