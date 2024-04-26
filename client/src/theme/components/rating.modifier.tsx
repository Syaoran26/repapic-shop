import { Components, Theme } from '@mui/material/styles';
import { StarIcon } from '~/components/Icons';

export const MuiRating: Components<Theme>['MuiRating'] = {
  defaultProps: {
    icon: <StarIcon className="text-[#faaf00] shrink-0" />,
    emptyIcon: <StarIcon className="text-[#cad1d7] shrink-0" />,
  },
  styleOverrides: {},
};
