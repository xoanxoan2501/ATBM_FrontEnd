import React, { useState, useRef } from "react";
import AppleIcon from "@mui/icons-material/Apple";
// import SamsungIcon from '.Menus/PictureIcon/MyIcon.eps';
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Store from "./Menus/Store";
import Ipad from "./Menus/Ipad";
import Airpods from "./Menus/Airpods";
import Iphone from "./Menus/Iphone";
import Mac from "./Menus/Mac";
import Watch from "./Menus/Watch";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ModeSelection from "../../components/Modeselection";
import Tooltip from "@mui/material/Tooltip";
import ProfileMenu from "./Profile/Profile";
import { MenuItem, IconButton, Popper, ClickAwayListener, Grow, MenuList, Paper, Button } from '@mui/material';


const Header = ({ sx }) => {
  const [open, setOpen] = useState(false);
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

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppleIcon />
        <Store />
        <Mac />
        <Ipad />
        <Iphone />
        <Watch />
        <Airpods />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SearchIcon fontSize="small" />
        <PersonIcon />
        <LocalMallIcon fontSize="small" />
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <PersonIcon fontSize="small" />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <ModeSelection />
      </Box>
    </Box>
  );
};

export default Header;
