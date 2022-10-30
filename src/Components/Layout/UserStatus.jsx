import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Fade, Typography, makeStyles } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { NavLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useAuthentication } from "../../v2/components/slice/useAuthentication";
import { GetUserFullName } from "../../Services/StoreSlices/UserSlice";
import { useSelector } from "react-redux";
import KeyIcon from "@mui/icons-material/Key";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    direction: "rtl",
    margin: 5,
    marginBottom: 70,
  },
  tabs: {
    marginRight: 60,
    flexGrow: 1,
    padding: 0,
    display: "flex",
    height: 70,
  },
  underlineNone: {
    textDecoration: "none",
    display: "block",
    textAlign: "center",
    padding: "20px 14px",
    fontSize: "17px",
    cursor: "pointer",
    color: "#7d7d7d",
    boxSizing: "	content-box",
    "&:hover": {
      color: "#5433d6",
    },
  },
  dissableLink: {
    display: "block",
    textAlign: "center",
    padding: "20px",
    fontSize: "16px",
    color: "#9d9d9d",
    boxSizing: "	content-box",
    pointerEvents: "none",
    cursor: "default",
    textDecoration: "none",
    opacity: ".5",
  },
  activeLink: {
    borderBottom: "2px solid #5433d6",
    color: "#5433d6",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    maxHeight: "90px",
    maxWidth: "90px",
    padding: "5px",
    position: "fixed",
    backgroundColor: "#fff",
    top: "2px",
    right: -3,
    borderRadius: "50%",
    boxShadow: "0 8px 6px -6px rgba(0,0,0,.4)",
  },
  Img: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  button: {
    margin: "10px",
    textDecoration: "none",
    textAlign: "center",
    fontFamily: "Kalameh",
    fontSize: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#7d7d7d",
    outline: "none",
    backgroundColor: "transparent",
    border: "none",
    "&:hover": {
      color: "#5433d6",
      textDecoration: "none",
    },
  },
  listItemText: {
    fontSize: "18px",
  },
}));

export default function UserStatus({ isLoggedIn }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { LogoutUser } = useAuthentication();
  const Name = useSelector(GetUserFullName);

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ fontSize: 20 }}
      >
        {!isLoggedIn ? (
          <NavLink to="/v2/Identity/login" className={classes.button}>
            <ExitToAppIcon style={{ margin: "4px", fontSize: "22px" }} />
            ورود یا ثبت نام
          </NavLink>
        ) : (
          <Typography variant="h6" className="Display-align">
            <PersonIcon style={{ margin: "4px" }} />
            {Name}
            <ArrowDropDownIcon fontSize="large" />{" "}
          </Typography>
        )}
      </Button>

      {isLoggedIn ? (
        <StyledMenu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <div>
            <MenuItem onClick={handleClose}>
              <NavLink to="/v2/profile/change-password">
                <button className={classes.button}>
                  {" "}
                  <KeyIcon style={{ margin: "4px" }} fontSize="small" />
                  تغییر رمز عبور
                </button>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink to="/Profile/Orders">
                <button className={classes.button}>
                  <PersonIcon style={{ margin: "4px" }} fontSize="small" />{" "}
                  پروفایل من
                </button>
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={() => {
                LogoutUser();
                handleClose();
              }}
              className={classes.button}
            >
              <PowerSettingsNewIcon
                style={{ margin: "4px" }}
                fontSize="small"
              />{" "}
              خروج
            </MenuItem>
          </div>
        </StyledMenu>
      ) : null}
    </div>
  );
}
