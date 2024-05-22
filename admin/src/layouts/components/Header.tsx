import { Avatar, Divider, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useLayoutEffect, useState } from 'react';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <header
      className={classNames('fixed top-0 left-[280px] right-0 z-50 bg-opacity-80 backdrop-blur-[6px]', {
        'bg-white': isScrolled,
      })}
    >
      <div
        className={classNames('flex items-center justify-between h-16 px-4 transition-all lg:px-10 md:px-5', {
          'md:h-20': !isScrolled,
        })}
      >
        <div></div>
        <div>
          <Tooltip title="Tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 28, height: 28 }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        MenuListProps={{ disablePadding: true }}
      >
        <Stack>
          <div className="px-4 pt-4 pb-3 text-sm">
            <h6 className="font-semibold">Admin</h6>
            <p className="text-fade">repapic.support@gmail.com</p>
          </div>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Stack padding={1}>
            <MenuItem onClick={handleClose}>Trang chủ</MenuItem>
            <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
            <MenuItem onClick={() => {}}>Đăng xuất</MenuItem>
          </Stack>
        </Stack>
      </Menu>
    </header>
  );
};

export default Header;
