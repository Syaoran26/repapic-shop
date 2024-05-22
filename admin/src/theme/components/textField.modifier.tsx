import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    default: true;
  }
}

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: {
    color: 'default',
  },
};
