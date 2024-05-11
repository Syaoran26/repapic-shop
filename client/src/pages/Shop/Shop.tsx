import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Chip,
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
import {
  resetFilter,
  selectIsFiltering,
  setFilter,
  setPage,
  setSearch,
  setSort,
} from '~/features/products/productsSlice';
import { useDebounce, useMount, useUpdateEffect } from '@common/hooks';
import { sortMenu } from './constants';
import { getProducts } from '~/features/products/productsSlice';
import { TrashIcon } from '@common/components/Icons';
import { format } from '@common/utils';

const Shop = () => {
  const { total, options } = useAppSelector((state) => state.products);
  const { search, sort, page, filter, limit } = options;
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openSort = Boolean(anchorEl);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(search as string);
  const debounceSearch = useDebounce(searchTerm, 300);

  useMount(() => {
    dispatch(resetFilter());
  });

  useUpdateEffect(() => {
    dispatch(setSearch(debounceSearch));
  }, [debounceSearch, dispatch]);

  useEffect(() => {
    dispatch(getProducts(options));
  }, [options, dispatch]);

  const handleOpenSort = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };
  const handleSortChange = (value: string | undefined) => () => {
    dispatch(setSort([value]));
    handleCloseSort();
  };
  const toggleFilter = (toggle: boolean) => () => {
    setOpenFilter(toggle);
  };
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value.startsWith(' ')) setSearchTerm(event.target.value);
  };

  const handleDeleteCategory = (id: string) => {
    dispatch(
      setFilter({
        categories: filter.categories.filter((item: string) => item !== id),
      }),
    );
  };

  return (
    <Container className="pt-20 mb-28">
      <Helmet>
        <title>Cửa hàng</title>
      </Helmet>
      <h1 className="my-6 text-xl font-bold md:my-10 md:text-2xl">Shop</h1>
      <Stack gap={2.5} marginBottom={{ xs: 3, lg: 5 }}>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-6 max-sm:items-stretch">
          <FormControl>
            <OutlinedInput
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
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
                <Badge variant="dot" color="error" invisible={!selectIsFiltering(filter)}>
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
              Sắp xếp: {sortMenu.find((item) => item.value === sort![0])?.label}
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
                  <MenuItem key={index} onClick={handleSortChange(item.value)} selected={item.value === sort}>
                    {item.label}
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </div>
        </div>
        {selectIsFiltering(filter) && (
          <Stack gap={1.5}>
            <div>
              <strong>{total}</strong>
              <span className="ml-1 text-fade">kết quả được tìm thấy</span>
            </div>
            <Stack direction="row" gap={1} alignItems="center">
              {filter.categories.length > 0 && (
                <div className="p-2 border border-dashed rounded-lg">
                  <Stack direction="row" gap={1} alignItems="center">
                    <span className="text-sm font-semibold">Danh mục:</span>
                    <Stack direction="row" gap={1} alignItems="center">
                      {filter.categories.map((value, index) => (
                        <Chip
                          key={index}
                          variant="filled"
                          color="default"
                          label={value}
                          onDelete={() => handleDeleteCategory(value)}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </div>
              )}
              {(filter.price.gte > 0 || filter.price.lte < 240_000) && (
                <div className="p-2 border border-dashed rounded-lg">
                  <Stack direction="row" gap={1} alignItems="center">
                    <span className="text-sm font-semibold">Giá:</span>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Chip
                        variant="filled"
                        color="default"
                        label={`${format.price(filter.price.gte)} - ${format.price(filter.price.lte)}`}
                        onDelete={() => dispatch(setFilter({ price: { gte: 0, lte: 240_000 } }))}
                      />
                    </Stack>
                  </Stack>
                </div>
              )}
              {typeof filter.rating === 'object' && (
                <div className="p-2 border border-dashed rounded-lg">
                  <Stack direction="row" gap={1} alignItems="center">
                    <span className="text-sm font-semibold">Đánh giá:</span>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Chip
                        variant="filled"
                        color="default"
                        label={`${filter.rating?.gte} sao trở lên`}
                        onDelete={() => dispatch(setFilter({ rating: undefined }))}
                      />
                    </Stack>
                  </Stack>
                </div>
              )}
              <Button variant="text" color="error" startIcon={<TrashIcon />} onClick={() => dispatch(resetFilter())}>
                Xoá
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
      <ProductGrid />
      {total > (limit as number) && (
        <Pagination
          className="mt-16 text-center"
          color="default"
          count={Math.ceil(total / (limit as number))}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Shop;
