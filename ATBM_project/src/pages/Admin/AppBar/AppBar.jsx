import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CategoryIcon from "@mui/icons-material/Category";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HeadsetIcon from "@mui/icons-material/Headset";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
export default function AppBar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <WidgetsIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SwapCallsIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PhoneIphoneIcon />
            </ListItemIcon>
            <ListItemText primary="Iphone" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <OndemandVideoIcon />
            </ListItemIcon>
            <ListItemText primary="Televison" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HeadsetIcon />
            </ListItemIcon>
            <ListItemText primary="Airpord" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
