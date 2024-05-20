import { Button, Container, Fab, LinearProgress } from '@mui/material';
import { FaAngleRight } from 'react-icons/fa6';
import { CiPlay1 } from 'react-icons/ci';
import { Comment } from '@common/types';
import CommentCard from './CommentCard';
import { Masonry } from '@mui/lab';
import MemberCard, { Member } from './MemberCard';
import SimpleBar from 'simplebar-react';
import { Helmet } from 'react-helmet';

const commentList: Comment[] = [
  {
    text: 'Excellent Work! Thanks a lot!',
    author: 'Lucian Obrien',
    date: '21 Apr 2024',
    image: '/images/avatar/avatar_2.jpg',
    rating: 4,
  },
  {
    text: 'Đó là một bảng điều khiển rất tốt và chúng tôi thực sự thích sản phẩm này. Chúng tôi đã thực hiện một số việc, như di chuyển sang TS và triển khai api useContext phản ứng, để phù hợp với phương pháp công việc của chúng tôi nhưng sản phẩm này là một trong những sản phẩm tốt nhất về mặt thiết kế và kiến trúc ứng dụng. Nhóm đã làm một công việc thực sự tốt.',
    author: 'Deja Brady',
    date: '20 Apr 2024',
    image: '/images/avatar/avatar_3.jpg',
    rating: 5,
  },
  {
    text: 'Hỗ trợ khách hàng thực sự nhanh chóng và hữu ích, thiết kế của chủ đề này trông thật tuyệt vời, mã cũng rất rõ ràng và dễ đọc, thực sự rất tốt!',
    author: 'Harrison Stein',
    date: '19 Apr 2024',
    image: '/images/avatar/avatar_4.jpg',
    rating: 4,
  },
  {
    text: 'Thật tuyệt vời, chất lượng mã thực sự tốt và cung cấp cho bạn rất nhiều ví dụ để triển khai.',
    author: 'Reece Chung',
    date: '18 Apr 2024',
    image: '/images/avatar/avatar_5.jpg',
    rating: 1,
  },
  {
    text: 'Có một số câu hỏi sau khi mua sản phẩm. Chủ sở hữu trả lời rất nhanh và rất hữu ích. Nhìn chung, mã này rất tuyệt vời và hoạt động rất tốt. 5/5 sao!',
    author: 'Lainey Davidson',
    date: '17 Apr 2024',
    image: '/images/avatar/avatar_6.jpg',
    rating: 3,
  },
  {
    text: 'CEO của Codealy.io tại đây. Chúng tôi đã xây dựng một nền tảng đánh giá nhà phát triển rất hợp lý - các nhiệm vụ dựa trên kho git và chạy trên máy ảo. Chúng tôi tự động hóa các điểm yếu - lưu trữ mã ứng viên, chạy mã đó và chia sẻ kết quả kiểm tra với toàn nhóm từ xa. Tôi đã mua mẫu này vì chúng tôi cần cung cấp một trang tổng quan tuyệt vời cho những khách hàng đầu tiên của mình. Tôi siêu hạnh phúc với việc mua hàng. Mã này cũng tốt như thiết kế. Cảm ơn!',
    author: 'Cristopher Cardenas',
    date: '16 Apr 2024',
    image: '/images/avatar/avatar_7.jpg',
    rating: 3,
  },
];

const memberList: Member[] = [
  {
    author: 'Nguyễn Thị Phương Thảo',
    role: 'Giám Đốc Điều Hành',
    image: '/images/portrait/portrait_11.jpg',
  },
  {
    author: 'Phan Ngọc Hoài Phương',
    role: 'Quản lý tài chính',
    image: '/images/portrait/portrait_22.jpg',
  },
  {
    author: 'Nguyễn Hồng Đức',
    role: 'Quản lý kỹ thuật',
    image: '/images/portrait/portrait_33.jpg',
  },
  {
    author: 'Nguyễn Đắc Tâm Minh',
    role: 'Quản lý Sáng tạo',
    image: '/images/portrait/portrait_44.jpg',
  },
  {
    author: 'Đặng Ngọc Tuấn',
    role: 'Quản lý nhân sự',
    image: '/images/portrait/portrait_55.jpg',
  },
  {
    author: 'Ngô Tuấn Kiệt',
    role: 'Quản lý vận hành',
    image: '/images/portrait/portrait_66.jpg',
  },
];

const AboutUs = () => {
  return (
    <div className="mt-16 md:mt-20">
      <Helmet>
        <title>Về chúng tôi</title>
      </Helmet>
      <div className="background-hero relative lg:h-[560px]">
        <Container>
          <div className="py-20 text-center lg:absolute bottom-20 lg:text-left lg:py-0">
            <div className="text-[40px] md:text-[52px] lg:text-[64px] font-extrabold text-primary leading-tight">
              Who
            </div>
            <div className="text-white text-[40px] md:text-[52px] lg:text-[64px] font-extrabold leading-tight">
              we are?
            </div>
            <p className="mt-6 text-xl font-semibold leading-normal text-white lg:text-2xl">
              Let's work together and <br /> make awesome site easily
            </p>
          </div>
        </Container>
      </div>
      <Container className="py-[120px]">
        <div className="grid xl:grid-cols-12 lg:grid-cols-2">
          <div className="max-lg:hidden xl:col-span-7">
            <div className="flex items-center pl-3 pr-14">
              <div className="flex-1 px-3">
                <img src="/images/about/what_2.png" alt="about1" />
              </div>
              <div className="flex-1 px-3">
                <img src="/images/about/what_1.png" alt="about2" />
              </div>
            </div>
          </div>
          <div className="max-lg:text-center xl:col-span-5">
            <div className="mb-6 text-[44px] font-extrabold leading-tight">Repapic là gì?</div>
            <p className="text-fade">
              REPAPIC, được thành lập với sứ mệnh truyền cảm hứng nghệ thuật và bảo vệ môi trường nhờ vào việc sử dụng
              giấy tái chế. REPAPIC chuyên cung cấp các set làm tranh chất lượng cao từ giấy tái chế. Sản phẩm của chúng
              tôi giúp mọi người ở mọi lứa tuổi phát huy tối đa khả năng sáng tạo, tạo ra những tác phẩm nghệ thuật
              tuyệt đẹp và góp phần vào một thế giới bền vững hơn.
            </p>
            <div className="flex flex-col gap-6 my-10">
              <div>
                <div className="flex flex-row items-center mb-2 text-sm">
                  <div className="font-semibold leading-6 grow">Development</div>
                  <p className="text-fade">20%</p>
                </div>
                <LinearProgress variant="determinate" value={20} />
              </div>
              <div>
                <div className="flex flex-row items-center mb-2 text-sm">
                  <div className="font-semibold grow">Design</div>
                  <p className="text-fade">40%</p>
                </div>
                <LinearProgress color="warning" variant="determinate" value={40} />
              </div>
              <div>
                <div className="flex flex-row items-center mb-2 text-sm">
                  <div className="font-semibold text-left grow">Marketing</div>
                  <p className="text-fade">60%</p>
                </div>
                <LinearProgress color="error" variant="determinate" value={60} />
              </div>
            </div>
            <Button size="large" variant="outlined" endIcon={<FaAngleRight />}>
              Our Work
            </Button>
          </div>
        </div>
      </Container>
      <div className="relative pb-20 bg-[#f4f6f8] before:absolute before:top-0 before:left-0 before:h-[120px] before:w-full before:bg-white">
        <Container>
          <div className="relative mb-20 overflow-hidden rounded-2xl before:bg-[#161c247a] before:absolute before:top-0 before:left-0 before:size-full">
            <img src="/images/about/vision.jpg" alt="about3" />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Fab color="primary">
                <CiPlay1 />
              </Fab>
            </div>
          </div>
          <div className="mx-auto text-center text-2xl md:text-[26px] lg:text-[30px] xl:text-[32px] font-bold max-w-[1100px]">
            Chúng tôi hướng tới một thế giới nơi nghệ thuật và trách nhiệm với môi trường song hành cùng nhau. <br />Một thế
            giới mà mọi người được truyền cảm hứng để tạo ra những điều đẹp đẽ đồng thời chú trọng đến dấu chân sinh
            thái của mình.
          </div>
        </Container>
      </div>
      <Container className="py-[120px]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-fader">Dream team</p>
          <p className="my-6 font-extrabold xl:text-5xl lg:text-[44px] md:text-[40px] text-[32px]">
            Great team is the key
          </p>
          <p className="max-w-[640px] mx-auto text-fade">
            Repapic sẽ hỗ trợ bạn nếu bạn gặp bất kỳ vấn đề nào, nhóm hỗ trợ của chúng tôi sẽ trả lời trong vòng một
            ngày và chúng tôi cũng có tài liệu chi tiết.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {memberList.map((member, index) => (
            <MemberCard key={index} data={member} />
          ))}
        </div>
        <div className="text-center">
          <Button size="large" variant="outlined" endIcon={<FaAngleRight />}>
            Tất cả thành viên
          </Button>
        </div>
      </Container>
      <div className="lg:h-[840px] py-20 lg:py-0 background-about">
        <Container>
          <div className="relative items-center grid-cols-6 lg:grid">
            <div className="col-span-2 p-3 max-lg:grid max-lg:grid-cols-12">
              <div className="text-white max-lg:col-span-10 max-lg:text-center max-lg:col-start-2">
                <p className="text-xs font-bold uppercase opacity-[0.48]">Testimonials</p>
                <h2 className="my-6 font-extrabold xl:text-5xl lg:text-[44px] md:text-[40px] text-[32px]">
                  Hãy <br /> cùng nhau
                </h2>
                <p>
                  Chúng tôi mời bạn tham gia cùng chúng tôi trên hành trình tạo ra một thế giới sáng tạo và bền vững
                  hơn. Dù bạn là một nghệ sĩ dày dạn kinh nghiệm hay chỉ mới bắt đầu, REPAPIC luôn có điều gì đó dành
                  cho bạn. Hãy cùng nhau làm nghệ thuật và tạo nên sự khác biệt.
                </p>
                <div className="mt-6 lg:hidden">
                  <Button color="success" variant="text" endIcon={<FaAngleRight />}>
                    Đọc thêm lời chứng thực
                  </Button>
                </div>
              </div>
            </div>
            <SimpleBar className="col-span-3 col-start-4 lg:h-[840px] overflow-y-clip max-lg:mt-2 lg:py-20">
              <Masonry columns={{ xs: 1, md: 2 }} spacing={2} sx={{ margin: 0 }}>
                {commentList.map((comment, index) => (
                  <CommentCard key={index} data={comment} />
                ))}
              </Masonry>
            </SimpleBar>
            <div className="absolute max-lg:hidden bottom-16 left-4">
              <Button color="success" variant="text" endIcon={<FaAngleRight />}>
                Đọc thêm lời chứng thực
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
