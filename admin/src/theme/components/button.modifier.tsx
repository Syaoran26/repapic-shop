import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true;
  }
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    color: 'default',
    variant: 'contained',
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      minWidth: 64,
      borderRadius: 8,
      fontWeight: 700,
      textTransform: 'unset',
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  variants: [
    {
      props: { color: 'default', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            default: { main, light },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
            backgroundColor: light,
          },
        };
      },
    },
    {
      props: { color: 'primary', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            primary: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'secondary', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            secondary: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'info', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'error', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'warning', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'success', variant: 'contained' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main },
          },
        } = theme;
        return {
          backgroundColor: main,
          '&:hover': {
            boxShadow: `${main}3d 0px 8px 16px 0px;`,
          },
        };
      },
    },
    {
      props: { color: 'default', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            default: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'primary', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            primary: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'secondary', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            secondary: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'info', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'error', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'warning', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'success', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'success', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main, light },
          },
        } = theme;
        return {
          borderColor: light,
          '&:hover': {
            boxShadow: `${main}3d 0px 0px 0px 0.5px`,
            backgroundColor: `${main}14`,
          },
        };
      },
    },
    {
      props: { color: 'default', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            default: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}14`,
          '&:hover': {
            backgroundColor: `${main}3D`,
          },
        };
      },
    },
    {
      props: { color: 'primary', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            primary: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { color: 'secondary', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            secondary: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { color: 'info', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { color: 'error', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { color: 'warning', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { color: 'success', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main, dark },
          },
        } = theme;
        return {
          color: dark,
          backgroundColor: `${main}29`,
          '&:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
    {
      props: { disabled: true, variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: { grey },
        } = theme;
        return {
          color: `${grey[500]}cc`,
          backgroundColor: `${grey[500]}3d`,
        };
      },
    },
    {
      props: { size: 'small' },
      style: {
        height: 30,
        paddingInline: 8,
        paddingBlock: 4,
      },
    },
    {
      props: { size: 'medium' },
      style: {
        height: 36,
        paddingInline: 12,
        paddingBlock: 6,
      },
    },
    {
      props: { size: 'large' },
      style: {
        height: 48,
        paddingInline: 16,
        paddingBlock: 8,
      },
    },
  ],
};
