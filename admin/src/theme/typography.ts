import { TypographyOptions } from '@mui/material/styles/createTypography';
import { palette } from './palette';

export const typography: TypographyOptions = {
  fontFamily: ['Public Sans', 'Roboto', 'Arial', 'sans-serif'].join(','),
  allVariants: {
    color: palette.grey?.[800],
    lineHeight: 1.71429,
    fontSize: '0.875rem',
  },
};
