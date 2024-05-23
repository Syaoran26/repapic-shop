import { Breadcrumbs, Button, Container, Link, Paper, TextField } from '@mui/material';
import config from '~/config';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Vui lòng nhập tên sản phẩm'),
  description: yup.string().required('Vui lòng nhập tên sản phẩm'),
  stock: yup.number().integer('Vui lòng nhập giá trị nguyên').min(0, 'Số lượng phải lớn hơn hoặc bằng 0'),
  price: yup.number().required('Vui lòng nhập giá tiền sản phẩm').min(0, 'Giá tiền phải lớn hơn không'),
  discount: yup.number().min(0, 'Giảm giá phải lớn hơn hoặc bằng 0%').max(100, 'Giảm giá phải nhỏ hơn hoặc bằng 0%'),
});

const Create = () => {
  return (
    <Container>
      <div className="mb-10">
        <h4 className="mb-2 text-2xl font-bold">Tạo sản phẩm mới</h4>
        <Breadcrumbs>
          <Link color="inherit" href={config.routes.admin}>
            Dashboard
          </Link>
          <Link color="inherit">Sản phẩm</Link>
          <span>Sản phẩm mới</span>
        </Breadcrumbs>
      </div>
      <Paper className="m-3">
        <div className="flex flex-col gap-6 p-6">
          <TextField id="name" required label="Tên sản phẩm" />
          <TextField id="description" required label="Mô tả sản phẩm" multiline rows={4} />
          <div className="flex flex-col gap-3">
            <h6 className="m-0 text-sm font-semibold">Hình ảnh sản phẩm</h6>
            <input required type="file" multiple accept="image/*" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField id="stock" label="Số lượng sản phẩm" type="number" />
            <TextField id="price" required label="Giá tiền" type="number" />
            <TextField id="discount" label="Giảm giá" type="number" />
          </div>
        </div>
      </Paper>
      <div className="flex justify-end p-3">
        <Button size="large" variant="contained">
          Tạo sản phẩm
        </Button>
      </div>
    </Container>
  );
};

export default Create;
