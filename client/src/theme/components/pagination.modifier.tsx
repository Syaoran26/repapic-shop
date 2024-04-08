import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    default: true;
  }
}

export const MuiPagination: Components<Theme>['MuiPagination'] = {
  styleOverrides: {
    ul: {
      justifyContent: 'center',
    },
  },
};
