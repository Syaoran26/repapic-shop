import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Tab } from '@mui/material';
import AccountGeneral from './AccountGeneral';
import AccountSecurity from './AccountSecurity';
import { KeyIcon, UserCardIcon } from '@common/components/Icons';
import { FaCartPlus } from 'react-icons/fa6';
import AccountOrder from './AccountOrder';

const tabs = {
  general: 'general',
  security: 'security',
  order: 'order',
};

const Account = () => {
  const [tabIndex, setTabIndex] = useState(tabs.general);

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };

  return (
    <div className="mt-16 lg:mt-20">
      <Container>
        <h4 className="mb-10 font-bold">Tài khoản</h4>
        <TabContext value={tabIndex}>
          <TabList className="mb-10" onChange={handleChange} aria-label="product-tabs">
            <Tab label="Tổng quan" value={tabs.general} icon={<UserCardIcon />} iconPosition="start" />
            <Tab label="Bảo mật" value={tabs.security} icon={<KeyIcon />} iconPosition="start" />
            <Tab label="Đơn hàng" value={tabs.order} icon={<FaCartPlus />} iconPosition="start" />
          </TabList>
          <TabPanel value={tabs.general} sx={{ padding: 0 }}>
            <AccountGeneral />
          </TabPanel>
          <TabPanel value={tabs.security} sx={{ padding: 0 }}>
            <AccountSecurity />
          </TabPanel>
          <TabPanel value={tabs.order} sx={{ padding: 0 }}>
            <AccountOrder />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
};

export default Account;
