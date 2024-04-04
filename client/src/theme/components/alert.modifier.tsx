import { Components, Theme } from '@mui/material/styles';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../components/Icons';

export const MuiAlert: Components<Theme>['MuiAlert'] = {
  defaultProps: {
    severity: 'info',
    variant: 'standard',
    iconMapping: {
      info: <InfoIcon />,
      success: <SuccessIcon />,
      warning: <WarningIcon />,
      error: <ErrorIcon />,
    },
    onClose: () => {},
  },
  styleOverrides: {
    root: {
      alignItems: 'center',
      minWidth: 64,
      borderRadius: 8,
      '& .MuiAlertTitle-root': {
        lineHeight: 1.5,
        fontWeight: 600,
        fontSize: '1rem',
      },
    },
  },
  variants: [
    {
      props: { severity: 'info', variant: 'standard' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { darker, lighter },
          },
        } = theme;
        return {
          backgroundColor: lighter,
          color: darker,
          '& .MuiAlertTitle-root': {
            color: darker,
          },
        };
      },
    },
    {
      props: { severity: 'success', variant: 'standard' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { darker, lighter },
          },
        } = theme;
        return {
          backgroundColor: lighter,
          color: darker,
          '& .MuiAlertTitle-root': {
            color: darker,
          },
        };
      },
    },
    {
      props: { severity: 'error', variant: 'standard' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { darker, lighter },
          },
        } = theme;
        return {
          backgroundColor: lighter,
          color: darker,
          '& .MuiAlertTitle-root': {
            color: darker,
          },
        };
      },
    },
    {
      props: { severity: 'warning', variant: 'standard' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { darker, lighter },
          },
        } = theme;
        return {
          backgroundColor: lighter,
          color: darker,
          '& .MuiAlertTitle-root': {
            color: darker,
          },
        };
      },
    },
    {
      props: { severity: 'info', variant: 'filled' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { main },
          },
        } = theme;
        return {
          color: 'white',
          backgroundColor: main,
        };
      },
    },
    {
      props: { severity: 'success', variant: 'filled' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main },
          },
        } = theme;
        return {
          color: 'white',
          backgroundColor: main,
        };
      },
    },
    {
      props: { severity: 'error', variant: 'filled' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { main },
          },
        } = theme;
        return {
          color: 'white',
          backgroundColor: main,
        };
      },
    },
    {
      props: { severity: 'warning', variant: 'filled' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { main },
            grey,
          },
        } = theme;
        return {
          color: grey[800],
          backgroundColor: main,
        };
      },
    },
    {
      props: { severity: 'info', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            info: { main, dark },
          },
        } = theme;
        return {
          border: `1px solid ${main}29`,
          backgroundColor: `${main}14`,
          color: dark,
          '& .MuiAlertTitle-root': {
            color: dark,
          },
        };
      },
    },
    {
      props: { severity: 'error', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            error: { main, dark },
          },
        } = theme;
        return {
          border: `1px solid ${main}29`,
          backgroundColor: `${main}14`,
          color: dark,
          '& .MuiAlertTitle-root': {
            color: dark,
          },
        };
      },
    },
    {
      props: { severity: 'success', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            success: { main, dark },
          },
        } = theme;
        return {
          border: `1px solid ${main}29`,
          backgroundColor: `${main}14`,
          color: dark,
          '& .MuiAlertTitle-root': {
            color: dark,
          },
        };
      },
    },
    {
      props: { severity: 'warning', variant: 'outlined' },
      style: ({ theme }) => {
        const {
          palette: {
            warning: { main, dark },
          },
        } = theme;
        return {
          border: `1px solid ${main}29`,
          backgroundColor: `${main}14`,
          color: dark,
          '& .MuiAlertTitle-root': {
            color: dark,
          },
        };
      },
    },
  ],
};
