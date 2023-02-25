import {
  Box,
  IconButton,
  // InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import { Logout, Settings } from "@mui/icons-material";
import Cookies from "universal-cookie";
const Topbar = () => {
  // Variables
  const theme = useTheme();
  const cookies = new Cookies();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [dropmenu, setDropmenu] = useState(null);
  const open = Boolean(dropmenu);

  // Functions
  const handleClick = (event) => {
    if (dropmenu === null) {
      setDropmenu(event.currentTarget);
    } else {
      setDropmenu(null);
    }
  };

  const handleLogOut = () => {
    cookies.remove("token");
    cookies.remove("username");
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      ></Box>

      {/* Icons */}
      <Box display="flex">
        <Tooltip title="Mode">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="My Account">
          <IconButton onClick={handleClick}>
            <PersonOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={dropmenu}
        open={open}
        id="account-menu"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
