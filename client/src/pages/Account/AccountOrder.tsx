import { format } from '@common/utils';
import { Paper } from '@mui/material';
import UserCart, { User } from './component/UserCart';
import { AddressShipping, CartItem } from '@common/types';
import AddressCart from './component/AddressCart';
import ProductCart from './component/ProductCart';

const ProductList: CartItem[] = [
  {
    product:{
      _id:'1',
      price:200000,
      stock:100,
      thumbnail:'/images/m_product/product_1.jpg',
      title:'Nike Air Force 1 NDESTRUKT',
      description:'abc',
      discount:10000,
      slug:'abc'
    },
    quantity:1
  },
  {
    product:{
      _id:'1',
      price:200000,
      stock:100,
      thumbnail:'/images/m_product/product_1.jpg',
      title:'Nike Air Force 1 NDESTRUKT',
      description:'abc',
      discount:10000,
      slug:'abc'
    },
    quantity:1
  },
  {
    product:{
      _id:'1',
      price:200000,
      stock:100,
      thumbnail:'/images/m_product/product_1.jpg',
      title:'Nike Air Force 1 NDESTRUKT',
      description:'abc',
      discount:10000,
      slug:'abc'
    },
    quantity:1
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
    _id:'1',
    address:{
      city:'Da Nang',
      district:'123',
      street:'19034 Verna Unions Apt',
      detail:'. 164 - Honolulu, RI / 87535',
      ward:'ab'
    },
    phone:'365-374-4961',
    isHome:true
  },
];

const AccountOrder = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-6 p-3">
        <Paper className="overflow-hidden">
          <div className="px-6 pt-6 ">
            <p className="m-0 text-lg font-bold">Chi tiết</p>
          </div>
          <div className="px-6">
            <div>
              {ProductList.map((product, index) => (
                <ProductCart key={index} data={product} />
              ))}
            </div>
            <div className="flex flex-col items-end gap-4 my-6 text-right">
              <div className="flex flex-row">
                <p className="text-fade">Tổng tiền hàng</p>
                <p className="w-40 text-sm font-semibold">{format.price(210000)}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-fade">Phí ship</p>
                <p className="w-40 text-error">{format.price(-10000)}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-fade">Giảm giá</p>
                <p className="w-40 text-error">{format.price(-10000)}</p>
              </div>
              <div className="flex flex-row font-semibold">
                <p>Tổng thanh toán</p>
                <p className="w-40">{format.price(180000)}</p>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-span-1 p-3">
        <Paper className="overflow-hidden">
          <div className="px-6 pt-6">
            <p className="m-0 text-lg font-bold">Thông tin khách hàng</p>
          </div>
          <div>
            {Userdata.map((user, index) => (
              <UserCart key={index} data={user} />
            ))}
          </div>
          <hr className="p-0 border border-t-0 border-dashed border-x-0" />
          <div className="px-6 pt-6">
            <p className="m-0 text-lg font-bold">Địa chỉ vận chuyển</p>
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
