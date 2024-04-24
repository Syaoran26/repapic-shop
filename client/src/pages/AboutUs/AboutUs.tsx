import { useState } from 'react';
import { Button, Container, Fab, LinearProgress } from '@mui/material';
import { FaAngleRight } from 'react-icons/fa6';
import { CiPlay1 } from 'react-icons/ci';
import Comment from '~/types/CommentType';
import CommentCard from './CommentCard';
import { Masonry } from '@mui/lab';
import Member from '~/types/MemberType';
import MemberCard from './MemberCard';
import { useMount } from '~/hooks';

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
    author: 'Jayvion Simon',
    role: 'HR Manager',
    image: '/images/portrait/portrait_1.jpg',
  },
  {
    author: 'Lucian Obrien',
    role: 'Data Analyst',
    image: '/images/portrait/portrait_2.jpg',
  },
  {
    author: 'Deja Brady',
    role: 'Legal Counsel',
    image: '/images/portrait/portrait_3.jpg',
  },
  {
    author: 'Harrison Stein',
    role: 'UX/UI Designer',
    image: '/images/portrait/portrait_4.jpg',
  },
];

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useMount(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  })
  
  return (
    <div className="mt-16 md:mt-20">
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
      <Container className="px-6 py-[120px]">
        <div className="grid xl:grid-cols-12 lg:grid-cols-2">
          <div className="pl-3 max-lg:hidden xl:col-span-7 pr-14">
            <div className="flex items-center">
              <div className="flex-1 px-3 ">
                <img src="/images/about/what_2.png" alt="about1" />
              </div>
              <div className="flex-1 px-3 ">
                <img src="/images/about/what_1.png" alt="about2" />
              </div>
            </div>
          </div>
          <div className="max-lg:text-center xl:col-span-5">
            <div className="mb-6 text-[44px] font-extrabold leading-tight">Repapic là gì?</div>
            <p className="leading-normal text-gray-600">
              Chủ đề của chúng tôi là chủ đề tiên tiến và thân thiện với người dùng nhất mà bạn có thể tìm thấy trên thị
              trường, chúng tôi có tài liệu và video để giúp thiết lập trang web của bạn thực sự dễ dàng, các bản demo
              được cài đặt sẵn mà bạn có thể nhập chỉ bằng một cú nhấp chuột và mọi thứ từ tùy chọn chủ đề đến nội dung
              trang có thể được chỉnh sửa từ front-end. Đây là chủ đề bạn đang tìm kiếm.
            </p>
            <div className="flex flex-col my-10 ">
              <div className="flex flex-row items-center mb-2 text-sm leading-6">
                <div className="font-semibold leading-6 text-left grow">Development</div>
                <p className="font-normal leading-6 text-gray-600 ">20%</p>
              </div>
              <LinearProgress variant="determinate" value={20} />
              <div className="flex flex-row items-center mt-6 mb-2 text-sm leading-6">
                <div className="font-semibold text-left grow">Design</div>
                <p className="font-normal text-gray-600 ">40%</p>
              </div>
              <LinearProgress color="warning" variant="determinate" value={40} />
              <div className="flex flex-row items-center mt-6 mb-2 text-sm leading-6">
                <div className="font-semibold text-left grow">Marketing</div>
                <p className="font-normal text-gray-600 ">60%</p>
              </div>
              <LinearProgress color="error" variant="determinate" value={60} />
            </div>
            <Button size="large" variant="outlined" endIcon={<FaAngleRight />}>
              Our Work
            </Button>
          </div>
        </div>
      </Container>
      <div className="relative pb-20 bg-slate-100 before:absolute before:h-[120px] before:bg-white before:top-0 before:left-0 before:w-full">
        <Container>
          <div className="overflow-hidden rounded-2xl relative mb-20 before:bg-[#161c247a] before:absolute before:top-0 before:left-0 before:size-full ">
            <img src="/images/about/vision.jpg" alt="about3" />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Fab color="primary">
                <CiPlay1 />
              </Fab>
            </div>
          </div>
          <div className="mx-auto text-center max-sm:text-2xl leading-normal md:text-[26px] lg:text-[30px] xl:text-[32px] font-bold lg:w-[800px]">
            Tầm nhìn của chúng tôi cung cấp sản phẩm tốt nhất dự kiến không có phương tiện nào bị hư hỏng.
          </div>
        </Container>
      </div>
      <Container className="py-[120px]">
        <div className="text-center">
          <p className="text-[12px] leading-normal font-bold text-fader uppercase">Dream team</p>
          <p className="my-6 font-extrabold xl:text-5xl lg:text-[44px] md:text-[40px] max-sm:text-[32px]">
            Great team is the key
          </p>
          <p className="md:mx-10 lg:mx-[168px] xl:mx-64 text-fade">
            Repapic sẽ hỗ trợ bạn nếu bạn gặp bất kỳ vấn đề nào, nhóm hỗ trợ của chúng tôi sẽ trả lời trong vòng một
            ngày và chúng tôi cũng có tài liệu chi tiết.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <div className="lg:h-[840px] py-0 background-about">
        <Container>
          <div className="relative max-lg:py-20">
            <div className="items-center lg:grid lg:grid-cols-7 xl:grid-cols-2">
              <div className="max-lg:grid max-lg:grid-cols-12 max-xl:col-span-3">
                <div className="max-lg:col-span-10 max-lg:text-center p-3 xl:w-[360px] lg:w-80 max-lg:col-start-2">
                  <p className="text-xs font-bold text-white uppercase opacity-[0.48]">Testimonials</p>
                  <p className="my-6 xl:text-5xl font-extrabold leading-snug text-white lg:text-[44px] md:text-[40px] max-md:text-[32px]">
                    Who love <br />
                    my work
                  </p>
                  <p className="text-white ">
                    Mục tiêu của chúng tôi là tạo ra sản phẩm và dịch vụ mà bạn hài lòng và sử dụng hàng ngày. Đây là lý
                    do tại sao chúng tôi không ngừng nỗ lực cải tiến dịch vụ của mình để cải thiện dịch vụ mỗi ngày và
                    thực sự lắng nghe những gì người dùng nói.
                  </p>
                  <div className="mt-6 lg:hidden">
                    <Button color="success" variant="text" endIcon={<FaAngleRight />}>
                      Đọc thêm lời chứng thực
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:h-[840px] lg:py-20 lg:overflow-auto lg:col-span-4 xl:col-span-1 max-lg:pt-2">
                <Masonry columns={isMobile?1:2} spacing={2}>
                  {commentList.map((comment, index) => (
                    <CommentCard key={index} data={comment} />
                  ))}
                </Masonry>
              </div>
            </div>
            <div className="absolute text-sm font-bold max-lg:hidden lg:bottom-16 lg:left-4">
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