import { Components, Theme } from '@mui/material/styles';

export const MuiSkeleton: Components<Theme>['MuiSkeleton'] = {
  defaultProps: {
    animation: 'wave',
  },
  variants: [
    {
      props: { animation: 'wave', variant: 'rounded' },
      style: {
        position: 'absolute',
      },
    },
  ],
};
