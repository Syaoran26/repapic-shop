import { Breadcrumbs, Container, Link } from '@mui/material';

const ProductDetail = () => {
  return (
    <div className="pt-16 md:pt-20">
      <Container className="mt-10">
        <div className="mb-10">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit">Trang chủ</Link>
            <Link color="inherit">Cửa hàng</Link>
            <Link color="inherit">Danh mục</Link>
            <span>Tên sản phẩm</span>
          </Breadcrumbs>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7 p-3 lg:p-5 xl:p-8">1</div>
          <div className="col-span-5 p-3 lg:p-5 xl:p-8">2</div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
