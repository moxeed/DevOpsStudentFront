import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { Link } from "react-router-dom";
import Token from "../../storage/Token";
import UserInfo from "../../storage/UserInfo";
import KeyIcon from "@mui/icons-material/Key";
import theme from "../../../styles/theme";
const MenuItems = [
  {
    label: "اطلاعات شخصی",
    id: 0,
    icon: <AccountCircleIcon fontSize="small" sx={{ m: 2 }} />,
  },
  {
    label: "همایش های من",
    id: 3,
    icon: <OndemandVideoIcon fontSize="small" sx={{ m: 2 }} />,
  },
  {
    label: "تدریس های من",
    id: 5,
    icon: <CollectionsBookmarkIcon fontSize="small" sx={{ m: 2 }} />,
  },
  {
    label: "آزمون های من",
    id: 4,
    icon: <PendingActionsIcon fontSize="small" sx={{ m: 2 }} />,
  },
];

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const name = "name";

  const isLoggedin = Token.get() !== null;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Token.remove();
    UserInfo.remove();
  };

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", alignItems: "baseline", textAlign: "center" }}
      >
        {isLoggedin ? (
          <Tooltip title="صفحه شخصی" followCursor>
            <Button
              variant="contained"
              onClick={handleClick}
              size="large"
              startIcon={<Avatar />}
              sx={{
                backgroundColor: theme.palette.wintergreenDream,
                borderWidth: "3px",
                margin: "20px",
                "&:hover": {
                  borderWidth: "3px",
                },
              }}
              // eslint-disable-next-line no-undefined
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              // eslint-disable-next-line no-undefined
              aria-expanded={open ? "true" : undefined}
            >
              <Typography sx={{ ml: 8 }}>{name}</Typography>
              <ArrowDropDownIcon />
            </Button>
          </Tooltip>
        ) : (
          <Button
            component={Link}
            variant={"outlined"}
            color="info"
            to="/v2/identity/login"
            underline="none"
            sx={{
              mr: "1.2em",
              fontSize: "1.2em",
              borderWidth: "3px",
              "&:hover": {
                borderWidth: "3px",
              },
            }}
          >
            ورود
          </Button>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: "0em 0.1em 0em .1em #f1f1f1",
            overflow: "visible",
            "& .MuiMenu-list": {
              backgroundColor: "white",
            },
            "& .MuiAvatar-root": {
              width: 30,
              height: 30,
              ml: 1.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: "10%",
              left: 14,
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
        <MenuItem
          component={Link}
          to={"/v2/profile/change-password"}
          sx={{
            justifyContent: "start",
            fontSize: "1em",
            alignItem: "center",
          }}
        >
          <KeyIcon fontSize="small" sx={{ m: 2 }} />
          تغییر رمز عبور
        </MenuItem>
        {MenuItems.map((item) => (
          <MenuItem
            key={item.id}
            component={Link}
            to={"/v2/profile/orders/" + item.id}
            sx={{
              justifyContent: "start",
              fontSize: "1em",
              alignItem: "center",
            }}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          sx={{
            justifyContent: "start",
            fontSize: "1em",
            alignItem: "center",
          }}
          onClick={() => logout()}
        >
          <ListItemIcon sx={{ mr: 1 }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          خروج
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
