import { FaFacebookF } from 'react-icons/fa6';
import config from '~/config';
import { GoogleIcon } from '@icons';
import { Helmet } from 'react-helmet';
import { auth, facebookProvider, googleProvider } from '~/config/firebase';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { Fab, Link, Tooltip } from '@mui/material';
import LoginForm from './LoginForm';

const Login = () => {
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
      <LoginForm />
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
