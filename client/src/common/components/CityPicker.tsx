import { useMount } from '@common/hooks';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import api from '~/config/api';

const CityPicker = () => {
  const [cities, setCities] = useState([]);
  useMount(() => {
    api.get('/address/cities').then((res) => {
      const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
      setCities(data);
    });
  });
  return (
    <Autocomplete
      disablePortal
      id="city-picker"
      options={cities}
      renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
    />
  );
};

export default CityPicker;
