import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { Credentials } from '~/features/auth/authServices';
import { login } from '~/features/auth/authSlice';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import constants from '~/utils/constants';

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email').matches(constants.emailRegex, 'Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const LoginForm = () => {
  const { user, message, isLoading, isError } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Credentials) => {
    dispatch(login(data));
  };

  useLayoutEffect(() => {
    if (user && !isLoading && !isError) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, isError]);

  return (
    <form className="flex flex-col gap-5 none" onSubmit={handleSubmit(onSubmit)}>
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
      <Link
        href={config.routes.forgotPassword}
        className="text-right"
        color="inherit"
        underline="always"
        sx={{ fontSize: 14 }}
      >
        Quên mật khẩu?
      </Link>
      {isError && (
        <Alert severity="error" onClose={undefined}>
          {message}
        </Alert>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        color="default"
        size="large"
        loading={isLoading}
        loadingPosition="end"
        endIcon={<FaAngleRight />}
        sx={{ justifyContent: 'space-between', paddingInline: 2 }}
      >
        Đăng nhập
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
