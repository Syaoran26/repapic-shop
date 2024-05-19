import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CharacterPurchaseIcon } from '@common/components/Icons';
import { Button, Link } from '@mui/material';
import config from '~/config';

const bounceVariant = {
  initial: {
    opacity: 0,
    scale: '50%',
  },
  animate: {
    opacity: 1,
    scale: '100%',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const Purchase = () => {
  return (
    <motion.div
      className="flex flex-col gap-10 max-w-[480px]"
      variants={bounceVariant}
      initial="initial"
      animate="animate"
    >
      <Helmet>
        <title>Đặt hàng thành công</title>
      </Helmet>
      <motion.h3 className="text-3xl font-bold leading-[1.5] text-center" variants={bounceVariant}>
        Cảm ơn bạn vì đã mua hàng!
      </motion.h3>
      <motion.div variants={bounceVariant}>
        <CharacterPurchaseIcon />
      </motion.div>
      <motion.div variants={bounceVariant} className="text-center">
        Chúng tôi sẽ gửi cho bạn thông báo trong vòng 5 ngày khi hàng được giao. Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc
        nào thì hãy liên hệ với chúng tôi.
      </motion.div>
      <hr className="border-t-2 border-gray-300 border-dashed" />
      <motion.div variants={bounceVariant} className="flex items-center gap-4">
        <Button variant="outlined" size="large" component={Link} href={config.routes.shop} fullWidth>
          Tiếp tục mua sắm
        </Button>
        <Button size="large" component={Link} fullWidth>
          Tải xuống PDF
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Purchase;
