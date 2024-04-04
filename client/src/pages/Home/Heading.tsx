import { FC } from 'react';
import { motion } from 'framer-motion';

interface HeadingProps {
  title: string;
  subtitle?: string;
}

const textVariants = {
  initial: {
    x: -200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Heading: FC<HeadingProps> = ({ title }) => {
  return (
    <motion.h3
      variants={textVariants}
      initial="initial"
      whileInView="animate"
      className="flex justify-center items-center gap-3 mb-5 text-2xl font-bold md:text-3xl before:h-0.5 before:w-10 before:bg-default after:bg-default after:h-0.5 after:w-10"
    >
      <span className="text-center">{title}</span>
    </motion.h3>
  );
};

export default Heading;
