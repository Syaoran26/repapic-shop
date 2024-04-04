import { useState } from 'react';
import {
  Button,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import { FaAngleRight, FaFacebookF } from 'react-icons/fa6';
import config from '~/config';
import { GoogleIcon } from '~/components/Icons';
import { Helmet } from 'react-helmet';
import { auth, facebookProvider, googleProvider } from '~/config/firebase';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '~/app/hooks';
import { Credentials } from '~/features/auth/authServices';
import { login } from '~/features/auth/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const dispatch = useAppDispatch();

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

  const signInWithOthers = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-lg:bg-white max-lg:rounded-2xl max-lg:py-10 max-lg:px-6 max-lg:shadow-sm">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="mb-10">
        <h4 className="mb-4 text-xl lg:text-2xl font-bold leading-[1.5]">Đăng nhập vào Repapic</h4>
        <p className="text-sm">
          Người dùng mới?{' '}
          <Link href={config.routes.register} underline="hover" fontWeight={600}>
            Tạo tài khoản
          </Link>
        </p>
      </div>
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
        <Button
          type="submit"
          color="default"
          size="large"
          endIcon={<FaAngleRight />}
          sx={{ justifyContent: 'space-between', paddingInline: 2 }}
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex items-center gap-2 my-4 text-sm text-fader before:bg-fader before:h-px before:w-full after:bg-fader after:h-px after:w-full">
        hoặc
      </div>
      <div className="flex justify-center gap-2">
        <Tooltip title="Đăng nhập với Google" arrow>
          <Fab
            aria-label="Đăng nhập với Google"
            style={{ backgroundColor: 'white' }}
            size="small"
            onClick={() => signInWithOthers(googleProvider)}
          >
            <GoogleIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Đăng nhập với Facebook" arrow>
          <Fab
            aria-label="Đăng nhập với Facebook"
            style={{ backgroundColor: '#0866ff', color: 'white' }}
            size="small"
            onClick={() => signInWithOthers(facebookProvider)}
          >
            <FaFacebookF />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default Login;
