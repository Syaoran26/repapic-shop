import { Breadcrumbs, Button, Container, Link } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import config from '~/config';

const List = () => {
  return (
    <Container>
      <div className="flex items-center mb-10">
        <div className="flex-1">
          <h4 className="mb-2 text-2xl font-bold">Danh sách</h4>
          <Breadcrumbs>
            <Link color="inherit" href={config.routes.admin}>
              Dashboard
            </Link>
            <Link color="inherit">Sản phẩm</Link>
            <span>Danh sách</span>
          </Breadcrumbs>
        </div>
        <Button startIcon={<FaPlus />} size="large" component={Link} href={config.routes.product.create}>
          Thêm sản phẩm mới
        </Button>
      </div>
    </Container>
  );
};

export default List;
