import { FC, useState } from 'react';
import { useMount } from '@common/hooks';
import { Autocomplete, TextField } from '@mui/material';
import api from '~/config/api';

interface CityPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CityPicker: FC<CityPickerProps> = ({ value, onChange }) => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState<any>(null);

  useMount(() => {
    api.get('/address/cities?sort=name').then((res) => {
      const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
      setCities(data);
      setCity(data.find((item: any) => item.code === value) || null);
    });
  });

  const handleChange = (value: any) => {
    setCity(value);
    onChange && onChange(value?.code);
  };

  return (
    <Autocomplete
      disablePortal
      id="city-picker"
      options={cities}
      value={city}
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
    />
  );
};

export default CityPicker;
