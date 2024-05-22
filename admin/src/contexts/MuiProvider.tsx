import { FC, ReactNode } from 'react';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material';

interface MuiProviderProps {
  children: ReactNode;
}

const MuiProvider: FC<MuiProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme()}>{children}</ThemeProvider>;
};

export default MuiProvider;
