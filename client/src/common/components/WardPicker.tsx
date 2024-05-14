import { useMount } from '@common/hooks';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import api from '~/config/api';

const WardPicker = () => {
  const [wards, setWards] = useState([]);
  useMount(() => {
    api.get('/address/wards?district=492').then((res) => {
      const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
      setWards(data);
    });
  });
  return (
    <Autocomplete
      disablePortal
      id="district-picker"
      options={wards}
      renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
    />
  );
};

export default WardPicker;
