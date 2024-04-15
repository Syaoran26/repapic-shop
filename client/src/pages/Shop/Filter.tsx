import { FC, useState } from 'react';
import {
  Badge,
  Checkbox,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  Tooltip,
} from '@mui/material';
import { IoReload } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import SimpleBar from 'simplebar-react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useDebounce, useUpdateEffect } from '~/hooks';
import { resetFilter, selectIsFiltering, setFilter } from '~/features/products/optionsSlice';

interface FilterDrawerProps {
  onClose: () => void;
}

const FilterDrawer: FC<FilterDrawerProps> = ({ onClose }) => {
  const options = useAppSelector((state) => state.options);
  const {
    filter: { min, max, categories },
  } = options;
  const dispatch = useAppDispatch();
  const [range, setRange] = useState<number[]>([min, max]);
  const debounceRange = useDebounce(range, 300);

  useUpdateEffect(() => {
    dispatch(setFilter({ min: debounceRange[0], max: debounceRange[1] }));
  }, [debounceRange]);

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  const handleReset = () => {
    if (selectIsFiltering(options)) {
      setRange([0, 240_000]);
      dispatch(resetFilter());
    }
  };

  const handleChooseCategory = (id: string, checked: boolean) => {
    if (checked) {
      dispatch(setFilter({ categories: [...categories, id] }));
    } else {
      dispatch(
        setFilter({
          categories: categories.filter((item) => item !== id),
        }),
      );
    }
  };

  return (
    <>
      <div className="flex items-center py-4 pl-5 pr-2">
        <span className="flex-1 text-lg font-bold">Bộ lọc</span>
        <Tooltip title="Cài lại">
          <IconButton onClick={handleReset}>
            <Badge variant="dot" color="error" invisible={!selectIsFiltering(options)}>
              <IoReload fontSize={20} />
            </Badge>
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
            <FormGroup aria-labelledby="demo-radio-buttons-group-label">
              <FormControlLabel
                value="1"
                onChange={(_, checked) => handleChooseCategory('1', checked)}
                checked={categories.includes('1')}
                control={<Checkbox />}
                label="Tranh anime"
              />
              <FormControlLabel
                value="2"
                onChange={(_, checked) => handleChooseCategory('2', checked)}
                checked={categories.includes('2')}
                control={<Checkbox />}
                label="Tranh phong cảnh"
              />
              <FormControlLabel
                value="3"
                onChange={(_, checked) => handleChooseCategory('3', checked)}
                checked={categories.includes('3')}
                control={<Checkbox />}
                label="Tranh chân dung"
              />
            </FormGroup>
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
              <Slider
                value={range}
                onChange={handleChangeRange}
                disableSwap
                marks
                step={20_000}
                min={0}
                max={240_000}
              />
            </div>
          </Stack>
        </div>
      </SimpleBar>
    </>
  );
};

export default FilterDrawer;
