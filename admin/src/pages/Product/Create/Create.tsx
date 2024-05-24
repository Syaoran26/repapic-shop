import { useEffect, useState } from 'react';
import { Breadcrumbs, Container, Link, Paper, Stack, TextField } from '@mui/material';
import config from '~/config';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@common/hooks';
import { createProduct } from '~/features/products/productsSlice';
import { Image } from '@common/components';

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tên sản phẩm'),
  description: yup.string().required('Vui lòng nhập tên sản phẩm'),
  thumbnail: yup
    .mixed((input): input is FileList => input instanceof FileList)
    .test('hasThumbnail', 'Vui lòng chọn ảnh thumbnail', (value) => {
      if (!value || !value.length) return false;
      return true;
    }),
  images: yup
    .mixed((input): input is FileList => input instanceof FileList)
    .test('hasThumbnail', 'Vui lòng chọn hình ảnh', (value) => {
      if (!value || !value.length) return false;
      return true;
    }),
  stock: yup
    .number()
    .typeError('Vui lòng nhập số lượng')
    .integer('Vui lòng nhập giá trị nguyên')
    .min(0, 'Số lượng phải lớn hơn hoặc bằng 0'),
  price: yup.number().typeError('Vui lòng nhập giá tiền sản phẩm').positive('Giá tiền phải lớn hơn 0 VND'),
  discount: yup
    .number()
    .typeError('Vui lòng nhập giảm giá')
    .min(0, 'Giảm giá phải lớn hơn hoặc bằng 0%')
    .max(100, 'Giảm giá phải nhỏ hơn hoặc bằng 100%'),
});

const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { isLoading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const thumbnail = watch('thumbnail');
  const images = watch('images');

  useEffect(() => {
    if (thumbnail && thumbnail.length > 0) {
      const url = URL.createObjectURL(thumbnail[0]);
      setThumbnailPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnail]);

  useEffect(() => {
    if (images && images.length > 0) {
      const urls = Array.from(images).map((file) => {
        const url = URL.createObjectURL(file as File); // Type casting to File
        return url;
      });
      setImagesPreview(urls);

      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images]);

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else {
        formData.append(key, value.toString());
      }
    });
    dispatch(createProduct(formData));
  };

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Paper className="m-3">
          <div className="flex flex-col gap-6 p-6">
            <TextField
              id="name"
              required
              label="Tên sản phẩm"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              id="description"
              required
              label="Mô tả sản phẩm"
              multiline
              rows={4}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              required
              id="thumbnail"
              label="Thumbnail"
              type="file"
              inputProps={{
                accept: '.jpg, .jpeg, .png',
              }}
              InputLabelProps={{ shrink: true }}
              {...register('thumbnail')}
              error={!!errors.thumbnail}
              helperText={errors.thumbnail?.message}
            />
            {thumbnailPreview && (
              <Stack direction="row" gap={2} marginBlock={3}>
                <div className="border size-20 rounded-xl">
                  <Image src={thumbnailPreview} rounded="xl" />
                </div>
              </Stack>
            )}
            <TextField
              required
              id="images"
              label="Hình ảnh"
              type="file"
              inputProps={{
                accept: '.jpg, .jpeg, .png',
                multiple: true,
              }}
              InputLabelProps={{ shrink: true }}
              {...register('images')}
              error={!!errors.images}
              helperText={errors.images?.message}
            />
            {imagesPreview && (
              <Stack direction="row" gap={2} marginBlock={3}>
                {imagesPreview.map((image, index) => (
                  <div key={index} className="border size-20 rounded-xl">
                    <Image src={image} rounded="xl" />
                  </div>
                ))}
              </Stack>
            )}
            <div className="grid grid-cols-3 gap-4">
              <TextField
                id="stock"
                label="Số lượng sản phẩm"
                type="number"
                defaultValue={0}
                {...register('stock')}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
              <TextField
                id="price"
                required
                label="Giá tiền"
                type="number"
                defaultValue={0}
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                id="discount"
                label="Giảm giá"
                type="number"
                defaultValue={0}
                {...register('discount')}
                error={!!errors.discount}
                helperText={errors.discount?.message}
              />
            </div>
          </div>
        </Paper>
        <div className="flex justify-end p-3">
          <LoadingButton size="large" variant="contained" type="submit" loading={isLoading}>
            Tạo sản phẩm
          </LoadingButton>
        </div>
      </form>
    </Container>
  );
};

export default Create;
