import { FC, useState } from 'react';
import {
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Tooltip,
} from '@mui/material';
import { IoReload } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import SimpleBar from 'simplebar-react';

interface FilterDrawerProps {
  onClose: () => void;
}

const FilterDrawer: FC<FilterDrawerProps> = ({ onClose }) => {
  const [range, setRange] = useState<number[]>([0, 240_000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  return (
    <>
      <div className="flex items-center py-4 pl-5 pr-2">
        <span className="flex-1 text-lg font-bold">Bộ lọc</span>
        <Tooltip title="Cài lại">
          <IconButton>
            <IoReload fontSize={20} />
          </IconButton>
        </Tooltip>
        <IconButton onClick={onClose}>
          <AiOutlineClose fontSize={20} />
        </IconButton>
      </div>
      <Divider />
      <SimpleBar forceVisible="x" className="px-5 py-6 overflow-clip">
        <div className="flex flex-col gap-6">
          <FormControl>
            <h6 className="mb-2 text-sm font-semibold">Danh mục</h6>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio size="small" />} label="Tất cả" />
              <FormControlLabel value="male" control={<Radio size="small" />} label="Tranh anime" />
              <FormControlLabel value="other" control={<Radio size="small" />} label="Tranh phong cảnh" />
              <FormControlLabel value="else" control={<Radio size="small" />} label="Tranh chân dung" />
            </RadioGroup>
          </FormControl>
          <Stack>
            <h6 className="mb-2 text-sm font-semibold">Giá</h6>
            <div className="flex items-center gap-5 my-4">
              <FormControl variant="filled">
                <FilledInput
                  type="number"
                  size="small"
                  id="min"
                  value={range[0]}
                  slotProps={{ input: { sx: { paddingTop: 1 } } }}
                  endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                />
              </FormControl>
              -
              <FilledInput
                type="number"
                size="small"
                id="max"
                value={range[1]}
                slotProps={{ input: { sx: { paddingTop: 1 } } }}
                endAdornment={<InputAdornment position="end">₫</InputAdornment>}
              />
            </div>
            <div className="px-1">
              <Slider value={range} onChange={handleChange} disableSwap marks step={20_000} min={0} max={240_000} />
            </div>
          </Stack>
        </div>
      </SimpleBar>
    </>
  );
};

export default FilterDrawer;
