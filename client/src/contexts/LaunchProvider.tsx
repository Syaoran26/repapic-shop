import { FC, ReactNode, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface LaunchProviderProps {
  children: ReactNode;
}

const LaunchProvider: FC<LaunchProviderProps> = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default LaunchProvider;
