import React, { useState, useRef } from 'react';
import AppleIcon from '@mui/icons-material/Apple';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ModeSelection from '../../components/Modeselection';
import { Link } from 'react-router-dom';
import { routes } from '@/config/routeConfig';
import { authAPI } from '@/apis/authAPI';
import {
  MenuItem,
  Popper,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';

// Import các thành phần Menu của bạn
import Store from './Menus/Store';
import Ipad from './Menus/Ipad';
import Airpods from './Menus/Airpods';
import Iphone from './Menus/Iphone';
import Mac from './Menus/Mac';
import Watch from './Menus/Watch';
import useGlobalVariableContext from '@/hooks/MyProvider';
const Header = ({ sx }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State để mở Dialog xác nhận đăng xuất
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  // Hàm mở Dialog xác nhận đăng xuất
  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  // Đóng Dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const { user } = useGlobalVariableContext();

  const handleConfirmLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Lấy token từ accessToken trong localStorage

      if (!token) {
        console.error('Token is missing');
        return;
      }

      const requestData = { token };
      const response = await authAPI.logoutAPI(requestData);

      console.log('Logout successful:', response);

      // Xóa accessToken khỏi localStorage h sau khi đăng xuất
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setDialogOpen(false);
      setOpen(false);
    }
  };

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Tooltip title="homepage">
          <Link to={routes.HomePage}>
            <AppleIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'black',
              }}
              fontSize="small"
            />
          </Link>
        </Tooltip>

        <Store />
        <Mac />
        <Ipad />
        <Iphone />
        <Watch />
        <Airpods />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <SearchIcon fontSize="small" />
        <PersonIcon />
        <Link to={routes.Cart}>
          <Tooltip title="Cart">
            <LocalMallIcon
              sx={{ display: 'flex', alignItems: 'center', color: 'black' }}
              fontSize="small"
            />
          </Tooltip>
        </Link>

        <div>
          <Tooltip title="menu">
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{ position: 'relative', zIndex: 1000 }} // Đặt zIndex cao hơn
            >
              <PersonIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 1000 }} // Đặt zIndex cho Popper
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem sx={{ position: 'relative', zIndex: 10000 }}>
                        <Link
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          to={routes.Profile}
                        >
                          Profile
                        </Link>
                      </MenuItem>

                      <Link
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={routes.AdminUser}
                      >
                        <MenuItem>My account</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <ModeSelection />
      </Box>

      {/* Hộp thoại xác nhận đăng xuất */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có muốn đăng xuất không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Không
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
