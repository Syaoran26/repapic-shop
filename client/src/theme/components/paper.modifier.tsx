import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: {
      borderRadius: 16,
      color: palette.grey?.[800],
      boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    },
  },
  variants: [
    {
      props: { square: true },
      style: {
        borderRadius: 0,
      },
    },
  ],
};
