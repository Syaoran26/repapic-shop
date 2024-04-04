import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/InputBase' {
  interface InputBasePropsColorOverrides {
    default: true;
  }
}

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      fontSize: '1rem',
      borderRadius: 8,
    },
  },
};
