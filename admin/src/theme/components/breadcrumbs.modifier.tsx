import { Components, Theme } from '@mui/material/styles';
import { palette } from '../palette';

export const MuiBreadcrumbs: Components<Theme>['MuiBreadcrumbs'] = {
  defaultProps: {
    separator: <span className="rounded-full size-1 bg-fader"></span>,
  },
  styleOverrides: {
    separator: {
      marginLeft: 16,
      marginRight: 16,
    },
    li: {
      color: palette.grey?.[800],

      '&:last-of-type': {
        color: palette.grey?.[500],
      },
    },
  },
};
