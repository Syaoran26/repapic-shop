import { Button, Container, FormControl, InputAdornment, OutlinedInput, Pagination } from '@mui/material';
import { GoTriangleDown } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { MdFilterList } from 'react-icons/md';
import ProductGrid from './ProductGrid';

const Shop = () => {
  return (
    <Container className="pt-20 mb-28">
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
          <Button variant="text" endIcon={<MdFilterList />}>
            Bộ lọc
          </Button>
          <Button variant="text" endIcon={<GoTriangleDown />}>
            Sắp xếp: Không
          </Button>
        </div>
      </div>
      <ProductGrid />
      <Pagination className="mt-16 text-center" color="default" count={10} />
    </Container>
  );
};

export default Shop;
