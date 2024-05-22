import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import NavList, { NavItem } from './NavList';
import { DashboardIcon, ProductIcon } from '@common/icons';
import config from '~/config';

const Sidebar = () => {
  return (
    <div className="fixed w-[280px] h-full">
      <SimpleBar className="h-full px-4">
        <Stack gap={1}>
          <Link to={config.routes.admin}>
            <img src="/images/logo.png" alt="Repapic" />
          </Link>
          {NAV_ITEMS.map((item, index) => (
            <NavList data={item} key={index} />
          ))}
        </Stack>
      </SimpleBar>
    </div>
  );
};

const NAV_ITEMS: NavItem[] = [
  {
    icon: <DashboardIcon size={24} />,
    text: 'Dashboard',
    href: config.routes.admin,
  },
  {
    icon: <ProductIcon size={24} />,
    text: 'Sản phẩm',
    subNav: [
      {
        text: 'Danh sách',
        href: config.routes.product.list,
      },
      {
        text: 'Tạo',
        href: config.routes.product.create,
      },
    ],
  },
];

export default Sidebar;
