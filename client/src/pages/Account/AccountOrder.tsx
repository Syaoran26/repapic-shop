import { format } from '@common/utils';
import { Paper } from '@mui/material';
import UserCart, { User } from './component/UserCart';
import { AddressShipping } from '@common/types';
import AddressCart from './component/AddressCart';
import ProductCart, { Product } from './component/ProductCart';

const ProductList: Product[] = [
  {
    name: 'Nike Air Force 1 NDESTRUKT',
    image: '/images/m_product/product_1.jpg',
    type: '16H9UR0',
    price: 210000,
    quantity: 1,
  },
];

const Userdata: User[] = [
  {
    name: 'Lucian Obrien',
    email: 'ashlynn_ohara62@gmail.com',
    image: '/images/avatar/avatar_2.jpg',
    IPaddress: '192.158.1.38',
  },
];

const Adderssdata: AddressShipping[] = [
  {
    name: 'Lucian Obrien',
    home: true,
    addressStr: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
    phone: '365-374-4961',
    isDefault: true,
  },
];

const AccountOrder = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-6 p-3">
        <Paper className="overflow-hidden">
          <div className="px-6 pt-6 ">
            <p className="m-0 text-lg font-bold">Details</p>
          </div>
          <div className="px-6">
            <div>
              {ProductList.map((product, index) => (
                <ProductCart key={index} data={product} />
              ))}
            </div>
            <div className="flex flex-col items-end gap-4 my-6 text-right">
              <div className="flex flex-row">
                <p className="text-fade">Subtotal</p>
                <p className="w-40 text-sm font-semibold">{format.price(210000)}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-fade">Shipping</p>
                <p className="w-40 text-error">{format.price(-10000)}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-fade">Discount</p>
                <p className="w-40 text-error">{format.price(-10000)}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-fade">Taxes</p>
                <p className="w-40">{format.price(-10000)}</p>
              </div>
              <div className="flex flex-row font-semibold">
                <p>Total</p>
                <p className="w-40">{format.price(180000)}</p>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-span-1 p-3">
        <Paper className="overflow-hidden">
          <div className="px-6 pt-6">
            <p className="m-0 text-lg font-bold">Customer Info</p>
          </div>
          <div>
            {Userdata.map((user, index) => (
              <UserCart key={index} data={user} />
            ))}
          </div>
          <hr className="p-0 border border-t-0 border-dashed border-x-0" />
          <div className="px-6 pt-6">
            <p className="m-0 text-lg font-bold">Shipping</p>
          </div>
          <div>
            {Adderssdata.map((address, index) => (
              <AddressCart key={index} data={address} />
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default AccountOrder;
