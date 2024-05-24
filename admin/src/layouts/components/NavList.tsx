import { FC, ReactNode, useEffect, useState } from 'react';
import { Collapse, Link, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { functions } from '@common/utils';

export interface NavItem {
  icon: ReactNode;
  text: string;
  href?: string;
  subNav?: {
    text: string;
    href: string;
  }[];
}

interface NavListProps {
  data: NavItem;
}

const NavList: FC<NavListProps> = ({ data }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isActive = data.href
    ? functions.checkRouteMatch(data.href, location.pathname)
    : data.subNav?.some((item) => functions.checkRouteMatch(item.href, location.pathname));

  useEffect(() => {
    if (id === ':id') {
      navigate(functions.replaceParams(location.pathname, { id: 'moi' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, id]);

  const handleClick = () => {
    if (data.href) {
      navigate(data.href);
    } else {
      setOpen(!open);
    }
  };

  return (
    <List>
      <ListItemButton onClick={handleClick} selected={isActive}>
        <ListItemIcon>{data.icon}</ListItemIcon>
        <ListItemText primary={data.text} />
        {!data.href && (open ? <FaAngleDown size={16} /> : <FaAngleRight size={16} />)}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {data.subNav?.map((item, index) => {
            const isRouteMatch = functions.checkRouteMatch(item.href, location.pathname);
            return (
              <ListItemButton key={index} component={Link} href={item.href}>
                <ListItemIcon>
                  <span
                    className={classNames(
                      'flex items-end justify-center w-6 before:rounded-full before:transition-all',
                      { 'before:bg-primary before:size-2': isRouteMatch },
                      { 'before:bg-fade before:size-1': !isRouteMatch },
                    )}
                  ></span>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span
                      className={classNames({
                        'font-semibold': isRouteMatch,
                      })}
                    >
                      {item.text}
                    </span>
                  }
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default NavList;
