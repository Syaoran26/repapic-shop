import { FC, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import api from '~/config/api';

interface WardPickerProps {
  value?: string;
  district?: string;
  onChange?: (value: string) => void;
}

const WardPicker: FC<WardPickerProps> = ({ value, district, onChange }) => {
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(null);

  useEffect(() => {
    handleChange(null);
    if (district) {
      api.get(`/address/wards?sort=name&parent_code=${district}`).then((res) => {
        const data = res.data.map((item: any) => ({ ...item, label: item.name_with_type }));
        setWards(data);
        setWard(data.find((item: any) => item.code === value) || null);
      });
    } else {
      setWards([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district]);

  const handleChange = (value: any) => {
    setWard(value);
    onChange && onChange(value?.code || '');
  };

  return (
    <Autocomplete
      disablePortal
      id="district-picker"
      options={wards}
      value={ward}
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
    />
  );
};

export default WardPicker;
