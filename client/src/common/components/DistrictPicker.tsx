import { useMount } from '@common/hooks';
import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import api from '~/config/api';

const DistrictPicker = () => {
  const [districts, setDistricts] = useState([]);
  useMount(() => {
    api.get('/address/districts?city=48').then((res) => {
      const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
      setDistricts(data);
    });
  });
  return (
    <Autocomplete
      disablePortal
      id="district-picker"
      options={districts}
      renderInput={(params) => <TextField {...params} label="Huyện/Quận" />}
    />
  );
};

export default DistrictPicker;
