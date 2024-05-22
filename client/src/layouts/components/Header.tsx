import { MouseEvent, useLayoutEffect, useState } from 'react';
import { Avatar, Badge, Divider, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import config from '../../config';
import { Link } from 'react-router-dom';
import { CartIcon, HeartIcon, MenuIcon } from '@icons';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { logout } from '~/features/auth/authSlice';

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={classNames('fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-[6px]', {
        'bg-white': isScrolled,
      })}
    >
      <div
        className={classNames('flex items-center justify-between h-16 px-4 transition-all lg:px-10 md:px-5', {
          'md:h-20': !isScrolled,
        })}
      >
        <div className="lg:hidden">
          <IconButton>
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex items-center">
          <Link to={config.routes.home} className="w-32" title="Repapic">
            <img src="/images/logo.png" alt="Repapic" />
          </Link>
        </div>
        <div className="flex items-center h-full gap-8 max-lg:hidden">
          <Link to={config.routes.home} className="nav-link">
            Trang chủ
          </Link>
          <Link to={config.routes.shop} className="nav-link">
            Sản phẩm
          </Link>
          {/* <Link to="#" className="nav-link">
            Workshop
          </Link> */}
          <Link to={config.routes.aboutUs} className="nav-link">
            Về chúng tôi
          </Link>
          <Link to={config.routes.contactUs} className="nav-link">
            Liên hệ
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="max-lg:hidden">
            <Tooltip title="Yêu thích">
              <IconButton className="max-md:hidden">
                <HeartIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Tooltip title="Giỏ hàng">
            <IconButton component={Link} to={config.routes.cart}>
              <Badge badgeContent={cart.items.length} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 28, height: 28 }} src={user?.avatar} alt={user?.name} />
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
          {user ? (
            <>
              <div className="px-4 pt-4 pb-3 text-sm">
                <h6 className="font-semibold">{user.name}</h6>
                <p className="text-fade">{user.email}</p>
              </div>
              <Divider style={{ borderStyle: 'dashed' }} />
              <Stack padding={1}>
                <MenuItem component={Link} to={config.routes.home} onClick={handleClose}>
                  Trang chủ
                </MenuItem>
                <MenuItem component={Link} to={config.routes.account} onClick={handleClose}>
                  Tài khoản
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                    handleClose();
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Stack>
            </>
          ) : (
            <Stack padding={1}>
              <MenuItem component={Link} to={config.routes.login} onClick={handleClose}>
                Đăng nhập
              </MenuItem>
              <MenuItem component={Link} to={config.routes.register} onClick={handleClose}>
                Đăng ký
              </MenuItem>
            </Stack>
          )}
        </Stack>
      </Menu>
    </header>
  );
};

export default Header;
