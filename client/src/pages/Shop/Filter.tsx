import { FC } from 'react';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { IoReload } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import SimpleBar from 'simplebar-react';

interface FilterDrawerProps {
  onClose: () => void;
}

const FilterDrawer: FC<FilterDrawerProps> = ({ onClose }) => {
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
      <SimpleBar className="overflow-clip"></SimpleBar>
    </>
  );
};

export default FilterDrawer;
