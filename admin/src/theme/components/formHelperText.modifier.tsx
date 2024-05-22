import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

export const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: {
      fontSize: '0.75rem',
      color: palette.grey?.[600],
    },
  },
};
