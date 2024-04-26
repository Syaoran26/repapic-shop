import { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

export const MuiChip: Components<Theme>['MuiChip'] = {
  defaultProps: {
    variant: 'soft',
    color: 'default',
  },
  styleOverrides: {
    root: {
      borderRadius: 8,
      fontWeight: 500,
    },
    icon: {
      color: 'currentColor',
    },
    deleteIcon: {
      color: 'currentcolor',
      opacity: 0.48,

      '&:hover': {
        color: 'currentcolor',
        opacity: 1,
      },
    },
  },
  variants: [
    {
      props: { color: 'default', variant: 'filled' },
      style: ({ theme }) => {
        const {
          palette: {
            default: { light, main, contrastText },
          },
        } = theme;
        return {
          backgroundColor: main,
          color: contrastText,
          '&.MuiChip-clickable:hover': {
            backgroundColor: light,
          },
        };
      },
    },
    {
      props: { color: 'default', variant: 'soft' },
      style: ({ theme }) => {
        const {
          palette: {
            grey,
            default: { main },
          },
        } = theme;
        return {
          backgroundColor: `${grey[500]}29`,
          color: main,
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
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
          backgroundColor: `${main}29`,
          color: dark,
          '&.MuiChip-clickable:hover': {
            backgroundColor: `${main}52`,
          },
        };
      },
    },
  ],
};
