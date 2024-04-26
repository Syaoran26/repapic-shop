import { Button, LinearProgress, Rating, Stack } from '@mui/material';
import { FaPen } from 'react-icons/fa6';
import { StarIcon } from '~/components/Icons';

const ProductReviews = () => {
  return (
    <>
      <div className="grid-cols-3 lg:grid">
        <Stack alignItems="center" justifyContent="center" gap={1}>
          <h6 className="text-sm font-semibold">Đánh giá trung bình</h6>
          <h2 className="xl:text-5xl lg:text-[44px] md:text-[40px] text-[32px] font-extrabold leading-tight">
            3.7 / 5
          </h2>
          <Rating value={3.7} precision={0.25} readOnly size="large" />
          <span className="text-xs text-fade">(9.12k đánh giá)</span>
        </Stack>
        <div className="flex flex-col gap-3 px-6 py-10 border-dashed lg:border-l lg:border-r lg:px-10">
          <Stack direction="row" alignItems="center" gap={2}>
            <span className="flex items-center justify-between text-sm font-semibold w-7">
              5 <StarIcon className="text-[#faaf00]" />
            </span>
            <LinearProgress variant="determinate" color="inherit" value={60} className="flex-1" />
            <span className="w-12 text-sm text-fade">2.03k</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <span className="flex items-center justify-between text-sm font-semibold w-7">
              4 <StarIcon className="text-[#faaf00]" />
            </span>
            <LinearProgress variant="determinate" color="inherit" value={5} className="flex-1" />
            <span className="w-12 text-sm text-fade">8.49k</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <span className="flex items-center justify-between text-sm font-semibold w-7">
              3 <StarIcon className="text-[#faaf00]" />
            </span>
            <LinearProgress variant="determinate" color="inherit" value={5} className="flex-1" />
            <span className="w-12 text-sm text-fade">6.98k</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <span className="flex items-center justify-between text-sm font-semibold w-7">
              2 <StarIcon className="text-[#faaf00]" />
            </span>
            <LinearProgress variant="determinate" color="inherit" value={10} className="flex-1" />
            <span className="w-12 text-sm text-fade">9.12k</span>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <span className="flex items-center justify-between text-sm font-semibold w-7">
              1 <StarIcon className="text-[#faaf00]" />
            </span>
            <LinearProgress variant="determinate" color="inherit" value={20} className="flex-1" />
            <span className="w-12 text-sm text-fade">1.95k</span>
          </Stack>
        </div>
        <Stack alignItems="center" justifyContent="center">
          <Button variant="soft" size="large" startIcon={<FaPen size={16} />}>
            Viết đánh giá
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default ProductReviews;
