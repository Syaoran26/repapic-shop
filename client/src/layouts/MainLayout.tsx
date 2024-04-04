import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="h-[2000px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
