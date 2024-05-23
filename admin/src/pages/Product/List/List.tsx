import { Image, NoData } from '@common/components';
import { TrashIcon } from '@common/components/Icons';
import { useAppDispatch, useAppSelector, useDebounce, useMount, useUpdateEffect } from '@common/hooks';
import { Product } from '@common/types';
import { format } from '@common/utils';
import {
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa6';
import config from '~/config';
import { getProducts, setLimit, setPage, setSearch, setSort } from '~/features/products/productsSlice';
import { IoSearchOutline } from 'react-icons/io5';

const List = () => {
  const { products, options, total } = useAppSelector((state) => state.products);
  const { search, limit, page, sort } = options;
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>(search as string);
  const debounceSearch = useDebounce(searchTerm, 300);

  useMount(() => {
    dispatch(setLimit(5));
  });

  useEffect(() => {
    dispatch(getProducts(options));
  }, [options, dispatch]);

  useUpdateEffect(() => {
    dispatch(setSearch(debounceSearch));
  }, [debounceSearch, dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value.startsWith(' ')) setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
    dispatch(setPage(1));
  };

  const handleSort = (field: string) => (event: MouseEvent<HTMLElement>) => {
    if (sort) {
      switch (sort[0]) {
        case field:
          dispatch(setSort([`-${field}`]));
          break;
        case `-${field}`:
          dispatch(setSort([]));
          break;
        default:
          dispatch(setSort([field]));
      }
    }
  };

  return (
    <Container>
      <div className="flex items-center mb-10">
        <div className="flex-1">
          <h4 className="mb-2 text-2xl font-bold">Danh sách</h4>
          <Breadcrumbs>
            <Link color="inherit" href={config.routes.admin}>
              Dashboard
            </Link>
            <Link color="inherit">Sản phẩm</Link>
            <span>Danh sách</span>
          </Breadcrumbs>
        </div>
        <Button startIcon={<FaPlus />} size="large" component={Link} href={config.routes.product.create}>
          Thêm sản phẩm mới
        </Button>
      </div>
      <Paper>
        <div className="p-4">
          <TextField
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearchOutline className="size-5" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell width={500} onClick={handleSort('title')}>
                  <TableSortLabel
                    active={sort?.at(0)?.includes('title')}
                    direction={sort?.at(0)?.includes('-') ? 'desc' : 'asc'}
                  >
                    Sản phẩm
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={handleSort('createdAt')}>
                  <TableSortLabel
                    active={sort?.at(0)?.includes('createdAt')}
                    direction={sort?.at(0)?.includes('-') ? 'desc' : 'asc'}
                  >
                    Khởi tạo
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" onClick={handleSort('stock')}>
                  <TableSortLabel
                    active={sort?.at(0)?.includes('stock')}
                    direction={sort?.at(0)?.includes('-') ? 'desc' : 'asc'}
                  >
                    Số lượng
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" onClick={handleSort('price')}>
                  <TableSortLabel
                    active={sort?.at(0)?.includes('price')}
                    direction={sort?.at(0)?.includes('-') ? 'desc' : 'asc'}
                  >
                    Giá
                  </TableSortLabel>
                </TableCell>
                <TableCell width={96} />
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => <ProductRow key={product._id} data={product} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={total}
            rowsPerPage={limit || 5}
            page={page! - 1 || 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Container>
  );
};

interface ProductRowProps {
  data: Product;
}

const ProductRow: FC<ProductRowProps> = ({ data }) => {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>
        <Stack direction="row" gap={2} alignItems="center">
          <div className="flex-shrink-0 size-16">
            <Image src={data.thumbnail} rounded="xl" />
          </div>
          <h6 className="font-semibold line-clamp-2">{data.title}</h6>
        </Stack>
      </TableCell>
      <TableCell>
        <div>{moment(data.createdAt).format('DD/MM/YYYY')}</div>
        <div className="mt-1 text-sm text-fade">{moment(data.createdAt).format('HH:mm')}</div>
      </TableCell>
      <TableCell align="center">{data.stock}</TableCell>
      <TableCell align="center">{format.price(data.price)}</TableCell>
      <TableCell>
        <Stack direction="row" gap={1}>
          <Tooltip title="Sửa" arrow placement="top">
            <IconButton size="small">
              <FaPen />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá" arrow placement="top">
            <IconButton size="small" color="error">
              <TrashIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default List;
