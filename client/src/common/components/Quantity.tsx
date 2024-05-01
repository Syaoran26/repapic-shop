import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { HiMinusSmall, HiPlusSmall } from 'react-icons/hi2';

interface QuantityProps {
  value: number;
  available: number;
  onChange?: (value: number) => void;
  onIncrease?: (value?: number) => void;
  onDecrease?: (value?: number) => void;
}

const Quantity: FC<QuantityProps> = ({ value, available, onChange, onIncrease, onDecrease }) => {
  const [quantity, setQuantity] = useState(value);

  const handleDecrease = () => {
    if (onChange) {
      if (value <= 0) {
        return;
      }
      const data = value - 1;
      onChange(data);
      onDecrease && onDecrease(data);
    } else {
      if (quantity <= 0) {
        return;
      }
      const data = quantity - 1;
      setQuantity(data);
      onDecrease && onDecrease(data);
    }
  };

  const handleIncrease = () => {
    if (onChange) {
      if (value >= available) {
        return;
      }
      const data = value + 1;
      onChange(data);
      onIncrease && onIncrease(data);
    } else {
      if (quantity >= available) {
        return;
      }
      const data = quantity + 1;
      setQuantity(data);
      onIncrease && onIncrease(data);
    }
  };

  return (
    <div className="text-right">
      <div className="flex items-center justify-between w-[88px] p-1 border rounded-lg">
        <IconButton size="small" onClick={handleDecrease} disabled={value <= 0 || quantity <= 0}>
          <HiMinusSmall />
        </IconButton>
        <span className="text-sm">{onChange ? value : quantity}</span>
        <IconButton size="small" onClick={handleIncrease} disabled={value >= available || quantity >= available}>
          <HiPlusSmall />
        </IconButton>
      </div>
      <span className="text-xs">Có sẵn: {available}</span>
    </div>
  );
};

export default Quantity;
