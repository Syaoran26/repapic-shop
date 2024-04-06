import { Button } from '@mui/material';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import {
  Character403Icon,
  Character404Icon,
  Character500Icon,
  CharacterComingSoonIcon,
  CharacterMaintenanceIcon,
} from '~/components/Icons';
import BaseLayout from '~/layouts/BaseLayout';

interface ErrorPage {
  [key: string]: {
    text: string;
    description: string;
    icon?: JSX.Element;
  };
}

const errorPage: ErrorPage = {
  403: {
    text: 'Không có quyền truy cập!',
    description:
      'Trang bạn đang cố truy cập có quyền truy cập bị hạn chế. Vui lòng liên hệ quản trị viên hệ thống của bạn',
    icon: <Character403Icon />,
  },
  404: {
    text: 'Trang không tìm thấy!',
    description:
      'Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã gõ nhầm URL? Hãy chắc chắn để kiểm tra chính tả.',
    icon: <Character404Icon />,
  },
  500: {
    text: 'Lỗi máy chủ nội bộ!',
    description: 'Đã xảy ra lỗi, xin thử lại sau.',
    icon: <Character500Icon />,
  },
  maintenance: {
    text: 'Trang web hiện đang được bảo trì!',
    description: 'Chúng tôi hiện đang làm việc chăm chỉ trên trang này!',
    icon: <CharacterMaintenanceIcon />,
  },
  comingSoon: {
    text: 'Sắp ra mắt!',
    description: 'Chúng tôi hiện đang làm việc chăm chỉ trên trang này!',
    icon: <CharacterComingSoonIcon />,
  },
};

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    const status = errorPage[error.status] ? error.status : 'maintenance';

    return (
      <BaseLayout>
        <div className="w-[400px] text-center">
          <h3 className="text-[2rem] font-bold leading-[1.5] mb-4">{errorPage[status].text}</h3>
          <p className="text-fade leading-[1.5]">{errorPage[status].description}</p>
          <div className="mx-10 my-20">{errorPage[status].icon}</div>
          <Button size="large" color="default" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </div>
      </BaseLayout>
    );
  }

  throw error;
};

export default ErrorBoundary;
