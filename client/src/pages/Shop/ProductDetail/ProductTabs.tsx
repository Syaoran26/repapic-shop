import { useState } from 'react';
import { Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProductReviews from './ProductReviews';

const tabs = {
  description: 'description',
  reviews: 'reviews',
};

const ProductTabs = () => {
  const [tabIndex, setTabIndex] = useState(tabs.reviews);
  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };

  return (
    <Paper>
      <TabContext value={tabIndex}>
        <TabList onChange={handleChange} aria-label="product-tabs">
          <Tab label="Mô tả chi tiết" value={tabs.description} />
          <Tab label="Đánh giá (20)" value={tabs.reviews} />
        </TabList>
        <TabPanel value={tabs.description}>1</TabPanel>
        <TabPanel value={tabs.reviews} sx={{ padding: 0 }}>
          <ProductReviews />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default ProductTabs;
