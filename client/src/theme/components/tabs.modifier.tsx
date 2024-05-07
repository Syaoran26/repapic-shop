import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

declare module '@mui/material/Tabs' {
  interface TabsPropsTextColorOverrides {
    default: true;
  }
  interface TabsPropsIndicatorColorOverrides {
    default: true;
  }
}

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  defaultProps: {
    textColor: 'inherit',
    indicatorColor: 'default',
  },
  styleOverrides: {
    root: {
      paddingLeft: 24,
      paddingRight: 24,
      boxShadow: `${palette.grey?.[500]}14 0px -2px 0px 0px inset`,

      '.MuiTab-root': {
        display: 'inline-flex',
        textTransform: 'unset',
        padding: 0,

        '& + .MuiTab-root': {
          marginLeft: 20,
        },
      },
    },
  },
  variants: [
    {
      props: { indicatorColor: 'default' },
      style: ({ theme }) => {
        const {
          palette: {
            default: { main },
          },
        } = theme;
        return {
          '.MuiTabs-indicator': {
            backgroundColor: main,
          },
        };
      },
    },
  ],
};
