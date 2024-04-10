import { MouseEvent, useState } from 'react';
import {
  Button,
  Container,
  Drawer,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Stack,
} from '@mui/material';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { MdFilterList } from 'react-icons/md';
import ProductGrid from './ProductGrid';
import { Helmet } from 'react-helmet';
import Filter from './Filter';

const sortMenu = [
  { value: '', label: 'Không' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-high', label: 'Giá: Cao - thấp' },
  { value: 'price-low', label: 'Giá: Thấp - cao' },
];

const Shop = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openSort = Boolean(anchorEl);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<number>(0);

  const handleOpenSort = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };
  const handleSortChange = (index: number) => () => {
    setSortBy(index);
    handleCloseSort();
  };
  const toggleFilter = (toggle: boolean) => () => {
    setOpenFilter(toggle);
  };

  return (
    <Container className="pt-20 mb-28">
      <Helmet>
        <title>Cửa hàng</title>
      </Helmet>
      <h1 className="my-6 text-xl font-bold md:my-10 md:text-2xl">Shop</h1>
      <div className="flex items-center justify-between mb-6 md:mb-10 max-sm:flex-col max-sm:gap-6 max-sm:items-stretch">
        <FormControl>
          <OutlinedInput
            placeholder="Tìm kiếm..."
            startAdornment={
              <InputAdornment position="start">
                <IoSearchOutline className="size-5" />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="flex items-center self-center gap-2">
          <Button variant="text" endIcon={<MdFilterList />} onClick={toggleFilter(true)}>
            Bộ lọc
          </Button>
          <Drawer
            open={openFilter}
            anchor="right"
            onClose={toggleFilter(false)}
            PaperProps={{ square: true, sx: { width: 280 } }}
          >
            <Filter onClose={toggleFilter(false)} />
          </Drawer>
          <Button variant="text" endIcon={openSort ? <GoTriangleUp /> : <GoTriangleDown />} onClick={handleOpenSort}>
            Sắp xếp: {sortMenu[sortBy].label}
          </Button>
          <Menu
            open={openSort}
            anchorEl={anchorEl}
            onClose={handleCloseSort}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <Stack paddingInline={1}>
              {sortMenu.map((item, index) => (
                <MenuItem key={item.value} onClick={handleSortChange(index)} selected={index === sortBy}>
                  {item.label}
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </div>
      </div>
      <ProductGrid />
      <Pagination className="mt-16 text-center" color="default" count={10} />
    </Container>
  );
};

export default Shop;
