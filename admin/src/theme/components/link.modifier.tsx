import { Components, Theme } from '@mui/material/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import React from 'react';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    return <RouterLink ref={ref} to={href} {...other} />;
  },
);

export const MuiLink: Components<Theme>['MuiLink'] = {
  defaultProps: {
    component: LinkBehavior,
    underline: 'hover',
  } as LinkProps,
  styleOverrides: {
    root: {
      cursor: 'pointer',
    },
  },
};
