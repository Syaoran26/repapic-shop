import { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import api from '~/config/api';
import { constants } from '@common/utils';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập họ tên').min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    email: yup.string().required('Vui lòng nhập email').matches(constants.emailRegex, 'Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập nật khẩu')
      .matches(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự số',
      ),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  })
  .required();

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    api
      .post('/auth/register', data)
      .then((res) => {
        toast.success(res.data?.message);
        navigate(config.routes.verify, { state: { email: data.email } });
      })
      .catch((err) => {
        toast.error(err.response?.data.message || constants.sthWentWrong, { position: 'top-left' });
      });
  };

  return (
    <form className="flex flex-col gap-5 none" onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <FormControl variant="outlined" color="default" error={!!errors.name}>
        <InputLabel htmlFor="name">Họ tên</InputLabel>
        <OutlinedInput id="name" label="Họ tên" {...register('name')} />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
      </FormControl>
      <FormControl variant="outlined" color="default" error={!!errors.email}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput id="email" label="Email" {...register('email')} />
        {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
      </FormControl>
      <FormControl variant="outlined" color="default" error={!!errors.password}>
        <InputLabel htmlFor="password">Mật khẩu</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Mật khẩu"
          {...register('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
                tabIndex={-1}
                size="small"
                edge="end"
              >
                {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
      </FormControl>
      <FormControl variant="outlined" color="default" error={!!errors.confirmPassword}>
        <InputLabel htmlFor="confirmPassword">Nhập lại mật khẩu</InputLabel>
        <OutlinedInput
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          label="Nhập lại mật khẩu"
          {...register('confirmPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
                tabIndex={-1}
                size="small"
                edge="end"
              >
                {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
      </FormControl>
      <Button
        type="submit"
        color="default"
        size="large"
        endIcon={<FaAngleRight />}
        sx={{ justifyContent: 'space-between', paddingInline: 2 }}
      >
        Tạo tài khoản
      </Button>
    </form>
  );
};

export default RegisterForm;
