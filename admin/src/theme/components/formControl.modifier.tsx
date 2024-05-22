import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    default: true;
  }
}

export const MuiFormControl: Components<Theme>['MuiFormControl'] = {
  defaultProps: {
    color: 'default',
  },
};
