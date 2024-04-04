import { Link } from '@mui/material';
import { Outlet } from 'react-router-dom';
import config from '../config';

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <div className="flex items-center justify-between h-16 px-6 transition-all md:h-20 ">
          <Link href={config.routes.home}>
            <img src="/images/logo.png" alt="Repapic" className="h-16 transition-all md:h-20" />
          </Link>
          <div className="font-semibold">
            <Link color="inherit">Cần giúp đỡ?</Link>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-center flex-grow px-4 background-3">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
