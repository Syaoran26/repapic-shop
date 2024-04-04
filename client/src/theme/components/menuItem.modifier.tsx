import { Components, Theme } from '@mui/material/styles';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      padding: '6px 8px',
      borderRadius: 6,
    },
  },
};
