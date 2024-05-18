import { FC } from 'react';
import { AddressShipping } from '@common/types';


interface AddressProps {
    data: AddressShipping;
  }

const AddressCart: FC<AddressProps> = ({data}) => {
  return (
    <div className="flex flex-col gap-3 p-6 text-sm font-normal">
            <div className="flex flex-row">
              <span className="text-fade shrink-0 w-[120px]">Địa chỉ</span>{data.addressStr}
            </div>
            <div className="flex flex-row">
              <span className="text-fade shrink-0 w-[120px]">Số điện thoại</span>{data.phone}
            </div>
          </div>
  )
}

export default AddressCart