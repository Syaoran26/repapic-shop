import './App.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import router from './router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useMount, useUpdateEffect } from '@common/hooks';
import { loginByRefreshToken } from './features/auth/authSlice';
import { getCart, resetCart } from './features/cart/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useMount(() => {
    dispatch(loginByRefreshToken());
  });

  useUpdateEffect(() => {
    if (user) {
      dispatch(getCart());
    } else {
      dispatch(resetCart());
    }
  }, [user?._id]);

  return (
    <div className="App">
      <Helmet defaultTitle="Repapic" titleTemplate="%s | Repapic">
        <meta name="description" content="Repapic - Make color with paper" />
        <meta name="theme-color" content="#00A76F" />
      </Helmet>
      <RouterProvider router={router} />
      <ToastContainer closeOnClick draggable className="custom-toast" />
    </div>
  );
}

export default App;
