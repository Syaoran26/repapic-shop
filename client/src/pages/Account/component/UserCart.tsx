import { FC } from 'react';
import { Avatar, Button } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';

export interface User {
  name: string;
  email: string;
  image: string;
  IPaddress: string;
}
interface UserProps {
  data: User;
}
const UserCart: FC<UserProps> = ({data}) => {
  return(
    <div className='flex flex-row p-6'>
        <Avatar
              alt="customer avatar"
              src={data.image}
              sx={{ width: 48, height: 48, marginRight: '16px' }}
            />
            <div className="flex flex-col items-start gap-1 text-sm font-normal">
              <h6 className="m-0 font-semibold">{data.name}</h6>
              <p className="text-fade">{data.email}</p>
              <div>
                Địa chỉ IP:<span className="text-fade ml-[2px]">{data.IPaddress}</span>
              </div>
              <Button variant="text" color="error" startIcon={<FaPlus />}>
                Thêm vào danh sách đen
              </Button>
            </div>
    </div>
  );
};

export default UserCart;
