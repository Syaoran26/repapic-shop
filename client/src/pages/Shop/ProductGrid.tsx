import { NoData, ProductCard } from '@common/components';
import { ProductCardSkeleton } from '@common/components/ProductCard';
import { useAppSelector } from '~/app/hooks';

const ProductGrid = () => {
  const { products, options, isLoading } = useAppSelector((state) => state.products);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading ? (
        Array.from({ length: options.limit as number }).map((_, index) => <ProductCardSkeleton key={index} />)
      ) : products.length > 0 ? (
        products.map((product, index) => <ProductCard key={index} data={product} />)
      ) : (
        <NoData title="Không có sản phẩm" className="col-span-full" />
      )}
    </div>
  );
};

export default ProductGrid;
