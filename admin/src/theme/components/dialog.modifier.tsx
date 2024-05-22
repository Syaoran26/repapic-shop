import { Components, Theme } from '@mui/material/styles';

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  defaultProps: {},
  styleOverrides: {
    paper: {
      borderRadius: 16,
      boxShadow: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px',
    },
  },
};
