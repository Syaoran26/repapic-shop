import React from 'react';
import { ProductCard } from '~/components';

const product = {
  name: '(Couple) Tranh tự thiết kế',
  thumbnail:
    'https://scontent.xx.fbcdn.net/v/t1.15752-9/434148027_714882674165872_3538940495319741361_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6hn7x5AjzLoAX_tsIUG&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQtRCsJ_Vk3PbtJ_9iEPkvI2ofmV3BpIStWVOBn8hd37g&oe=662B6852',
  price: 120000,
};

const ProductGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(16)
          .fill(product)
          .map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
      </div>
    </>
  );
};

export default ProductGrid;
