import { Button } from '@mui/material';
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
          <div className="h-screen pt-20 lg:ml-32">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  Khám phá
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Bộ Làm Tranh Bằng
                  <br />
                  Giấy Tái Chế
                </motion.h3>
                <motion.p variants={textVariants}>Góp phần tái sử dụng giấy và rác thải</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div className="flex items-center h-full overflow-hidden">
                <motion.img
                  src="https://i.imgur.com/1bItQNE.png"
                  alt="Banner1"
                  className="object-contain w-full h-full"
                  variants={imageVariants}
                  initial="initial"
                  whileInView="animate"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen pt-20 lg:ml-32">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  Chung tay
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Vì một màu xanh
                </motion.h3>
                <motion.p variants={textVariants}>Giấy tái chế 100%</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div className="flex items-center h-full overflow-hidden">
                <motion.img
                  src="https://i.imgur.com/s7WcGa7.png"
                  alt="Banner2"
                  className="object-contain w-full h-full"
                  variants={imageVariants}
                  initial="initial"
                  whileInView="animate"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen pt-20 lg:ml-32">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  Workshop
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  PAPER REVIVAL
                </motion.h3>
                <motion.p variants={textVariants}>Sự hồi sinh của giấy</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div className="flex items-center h-full overflow-hidden">
                <motion.img
                  src="https://i.imgur.com/5B9kH6f.png"
                  alt="Banner3"
                  className="object-contain w-full"
                  variants={imageVariants}
                  initial="initial"
                  whileInView="animate"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen pt-20 lg:ml-32">
            <div className="grid items-center justify-center h-full lg:grid-cols-2">
              <motion.div
                className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-sm md:text-lg lg:text-xl *:leading-[1] max-lg:text-center p-2"
                variants={textVariants}
                initial="initial"
                whileInView="animate"
              >
                <motion.span className="uppercase" variants={textVariants}>
                  Nhận Ngay
                </motion.span>
                <motion.h3 className="text-[2.5em] font-bold" variants={textVariants}>
                  Voucher
                </motion.h3>
                <motion.p variants={textVariants}>Giảm ngay 10% cho mỗi hóa đơn trên 200.000đ!</motion.p>
                <motion.div variants={textVariants}>
                  <Button startIcon={<ThunderIcon />} size="large">
                    Mua ngay
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div className="flex items-center h-full overflow-hidden">
                <motion.img
                  src="/images/banners/banner-1.png"
                  alt="Banner1"
                  className="object-contain w-full h-full"
                  variants={imageVariants}
                  initial="initial"
                  whileInView="animate"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
