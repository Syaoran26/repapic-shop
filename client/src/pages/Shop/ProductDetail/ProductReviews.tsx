import { Avatar, Button, Divider, LinearProgress, Pagination, Rating, Stack } from '@mui/material';
import { FaPen } from 'react-icons/fa6';
import { StarIcon } from '@icons';
import Comment from '~/types/CommentType';

const ProductReviews = () => {
  return (
    <>
      <div className="grid-cols-3 lg:grid max-lg:py-10">
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
      <Divider style={{ borderStyle: 'dashed' }} />
      <div className="grid-cols-2 pb-10 lg:grid">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <div className="col-span-2 mt-10">
          <Pagination className="mt-16 text-center" color="default" count={10} />
        </div>
      </div>
    </>
  );
};

const Review = ({ data }: { data?: Comment }) => {
  return (
    <Stack gap={2} marginTop={5} paddingInline={4}>
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar sx={{ width: 48, height: 48 }} src="/images/avatar/avatar_2.jpg" />
        <div>
          <div className="mb-1 text-sm font-semibold">Jayvion Simon</div>
          <div className="text-xs text-fade">26/04/2024</div>
        </div>
      </Stack>
      <Stack gap={1}>
        <Rating size="small" value={4} readOnly />
        <p className="text-sm text-fade">
          Mặt trời từ từ lặn phía chân trời, tô điểm bầu trời với những gam màu rực rỡ như cam và hồng.
        </p>
      </Stack>
    </Stack>
  );
};

export default ProductReviews;
