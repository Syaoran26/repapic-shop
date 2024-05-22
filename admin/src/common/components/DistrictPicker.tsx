import { FC, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import api from '~/config/api';

interface DistrictPickerProps {
  value?: string;
  city?: string;
  onChange?: (value: string) => void;
}

const DistrictPicker: FC<DistrictPickerProps> = ({ value, city, onChange }) => {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    handleChange(null);
    if (city) {
      api.get(`/address/districts?sort=name&parent_code=${city}`).then((res) => {
        const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
        setDistricts(data);
        setDistrict(data.find((item: any) => item.code === value) || null);
      });
    } else {
      setDistricts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleChange = (value: any) => {
    setDistrict(value);
    onChange && onChange(value?.code || '');
  };

  return (
    <Autocomplete
      disablePortal
      id="district-picker"
      options={districts}
      value={district}
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label="Huyện/Quận" />}
    />
  );
};

export default DistrictPicker;
