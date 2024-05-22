import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      padding: '6px 8px',
      borderRadius: 6,

      '&.Mui-selected': {
        fontWeight: 600,
        backgroundColor: `${palette.grey?.[500]}29`,

        '&:hover': {
          backgroundColor: `${palette.grey?.[500]}14`,
        },
      },
    },
  },
};
