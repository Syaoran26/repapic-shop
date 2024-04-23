import './App.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Helmet defaultTitle="Repapic" titleTemplate="%s | Repapic">
        <meta name="description" content="Repapic - Make color with paper" />
        <meta name="theme-color" content="#00A76F" />
      </Helmet>
      <RouterProvider router={router} />
      <ToastContainer closeOnClick draggable />
    </div>
  );
}

export default App;
