import AppleIcon from "@mui/icons-material/Apple";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
<<<<<<< HEAD
=======
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
>>>>>>> 1414ffc (Category and update homepage)
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

const Header = ({ sx }) => {
  console.log(sx);
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
          gap: 2,
        }}
      >
<<<<<<< HEAD
        <SearchIcon fontSize="small" />
        <LocalMallIcon fontSize="small" />
=======
        <Tooltip
          title="search"
          sx={{
            cursor: "pointer",
          }}
        >
          <SearchIcon fontSize="small" />
        </Tooltip>
        <Tooltip
          title="Cart"
          sx={{
            cursor: "pointer",
          }}
        >
          <LocalMallIcon fontSize="small" />
        </Tooltip>
        <Tooltip
          title="Profile"
          sx={{
            cursor: "pointer",
          }}
        >
          <PersonIcon fontSize="small" />
        </Tooltip>

        <ProfileMenu>
          <MenuIcon fontSize="small" />
        </ProfileMenu>
>>>>>>> 1414ffc (Category and update homepage)
        <ModeSelection />
      </Box>
    </Box>
  );
};

export default Header;
