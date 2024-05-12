import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const MainLayout = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
