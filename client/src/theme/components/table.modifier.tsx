import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

export const MuiTable: Components<Theme>['MuiTable'] = {
  styleOverrides: {
    root: {
      '.MuiTableHead-root': {
        backgroundColor: '#f4f6f8',

        '.MuiTableCell-root': {
          color: palette.grey?.[600],
          borderBottom: 'none',
        },
      },

      '.MuiTableBody-root': {
        '.MuiTableCell-root': {
          borderBottom: '1px dashed #f1f3f4',
        },
      },
    },
  },
};
