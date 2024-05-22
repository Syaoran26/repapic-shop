import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-shrink-0 w-[280px] border-r border-dashed">
        <Sidebar />
      </div>
      <main className="flex-1">
        <Header />
        <div className="px-4 py-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
