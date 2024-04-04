import { Components, Theme } from '@mui/material/styles';
import { CheckedIcon, IndeterminateIcon, UncheckedIcon } from '../../components/Icons';

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  defaultProps: {
    icon: <UncheckedIcon />,
    checkedIcon: <CheckedIcon />,
    indeterminateIcon: <IndeterminateIcon />,
  },
  variants: [
    {
      props: { size: 'medium' },
      style: {
        padding: 8,
        fontSize: '1.5rem',
      },
    },
    {
      props: { size: 'small' },
      style: {
        padding: 5,
        fontSize: '1.125rem',
      },
    },
    {
      props: { size: 'large' },
      style: {
        padding: 12,
        fontSize: '1.75rem',
      },
    },
  ],
};
