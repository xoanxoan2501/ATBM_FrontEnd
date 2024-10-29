import React, { useState, useRef } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import Store from "./Menus/Store";
import Ipad from "./Menus/Ipad";
import Iphone from "./Menus/Iphone";
import Mac from "./Menus/Mac";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ModeSelection from "../../components/Modeselection";
import {
  IconButton,
  Paper,
  InputBase, // Sửa lỗi ở đây
} from "@mui/material";

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
    if (event.key === "Tab") {
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
        <Box
          component="form"
          sx={{ p: '0px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: 500,
            height: 35,
            border: '1px solid',
            borderRadius: 10,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >

        <PersonIcon />
        <LocalMallIcon fontSize="small" />
        <ModeSelection />
      </Box>
    </Box>
  );
};

export default Header;
