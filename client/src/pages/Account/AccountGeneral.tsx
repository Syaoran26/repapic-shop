import CityPicker from '@common/components/CityPicker';
import DistrictPicker from '@common/components/DistrictPicker';
import WardPicker from '@common/components/WardPicker';
import { Autocomplete, Avatar, Button, Paper, TextField } from '@mui/material';

const AccountGeneral = () => {
  return (
    <div className="grid-cols-3 lg:grid">
      <div className="col-span-1 p-3">
        <Paper>
          <div className="px-6 pt-20 pb-10 text-center">
            <div className="p-2 m-auto border border-dashed rounded-full cursor-pointer w-36 h-36">
              <Avatar alt="avatar" src="/images/avatar/avatar_25.jpg" sx={{ width: 126.5, height: 126.5 }} />
            </div>
            <div className="mt-6 text-xs text-fade">
              Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3 Mb
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-span-2 p-3">
        <Paper className="p-6">
          <form>
            <div className="grid-cols-2 gap-4 md:grid ">
              <div className="flex flex-col gap-6">
                <TextField id="name" label="Tên" />
                <TextField id="phoneNumber" label="Số điện thoại" />
                <CityPicker />
                <WardPicker />
              </div>
              <div className="flex flex-col gap-6 max-md:mt-6">
                <TextField id="email" label="Email" disabled />
                <TextField id="Address" label="Tên đường/Số nhà" />
                <DistrictPicker />
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <TextField id="About" multiline rows={4} label="Mô tả" />
              <div className="flex justify-end">
                <Button type="submit" variant="contained">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AccountGeneral;
