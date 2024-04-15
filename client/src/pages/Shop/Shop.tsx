import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  Badge,
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
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { reset, selectIsFiltering, setSearch, setSort } from '~/features/products/optionsSlice';
import { useDebounce, useMount, useUpdateEffect } from '~/hooks';
import { sortMenu } from './constants';

const Shop = () => {
  const options = useAppSelector((state) => state.options);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openSort = Boolean(anchorEl);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(options.search);
  const debounceSearch = useDebounce(searchTerm, 300);

  useMount(() => {
    dispatch(reset());
  });

  useUpdateEffect(() => {
    dispatch(setSearch(debounceSearch));
  }, [debounceSearch, dispatch]);

  const handleOpenSort = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };
  const handleSortChange = (value: any) => () => {
    dispatch(setSort(value));
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
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IoSearchOutline className="size-5" />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="flex items-center self-center gap-2">
          <Button
            variant="text"
            endIcon={
              <Badge variant="dot" color="error" invisible={!selectIsFiltering(options)}>
                <MdFilterList />
              </Badge>
            }
            onClick={toggleFilter(true)}
          >
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
            Sắp xếp: {sortMenu.find((item) => item.value === options?.sort)?.label}
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
                <MenuItem key={index} onClick={handleSortChange(item.value)} selected={item.value === options.sort}>
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
