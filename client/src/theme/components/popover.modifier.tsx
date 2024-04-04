import { Components, Theme } from '@mui/material/styles';

export const MuiPopover: Components<Theme>['MuiPopover'] = {
  defaultProps: {},
  styleOverrides: {
    paper: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backgroundImage: 'url(/images/backgrounds/cyan-blur.png), url(/images/backgrounds/red-blur.png)',
      borderRadius: 10,
      boxShadow: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px',
      backdropFilter: 'blur(20px)',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'right top, left bottom',
      backgroundSize: '50%, 50%',
    },
  },
};
