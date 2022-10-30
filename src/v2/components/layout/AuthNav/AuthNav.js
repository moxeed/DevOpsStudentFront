import { useSelector } from "react-redux";
import {
  GetUserFullName,
  IsAuthenticated,
} from "src/Services/StoreSlices/UserSlice";
import BlueButton from "../../reusable/BlueButton/BlueButton";
import { Link } from "react-router-dom";
import Icon from "../../../assets/images/Icons/security-user.svg";
import profileIcon from "../../../assets/images/Icons/chart-square.svg";
import settingIcon from "../../../assets/images/Icons/setting-2.svg";
import logoutIcon from "../../../assets/images/Icons/lock.svg";
import classes from "./AuthNav.module.scss";
import { Button, MenuItem, Menu } from "@mui/material";
import { useState } from "react";
import { useAuthentication } from "src/Services/Authentication/useAuthentication";

export const AuthNav = () => {
  const Name = useSelector(GetUserFullName);
  const isLoggedIn = useSelector(IsAuthenticated);
  const { ResetToken } = useAuthentication();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {!isLoggedIn ? (
        <BlueButton
          label="ورود یا ثبت نام"
          type={Link}
          link={"/v2/identity/login"}
        ></BlueButton>
      ) : (
        <div>
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className={classes.navButoon}
          >
            <img src={Icon} width="20px" style={{ marginLeft: "5px" }} />
            {Name.length > 20 ? "حساب من" : Name}
          </Button>

          <Menu
            sx={{ "& ul": { display: "flex", flexDirection: "column" } }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              className={classes.navButoon}
              sx={{ height: "1vh" }}
            ></MenuItem>
            <MenuItem
              component={Link}
              to="/Profile/Orders"
              onClick={handleClose}
              className={classes.navButoon}
            >
              <img
                src={profileIcon}
                width="15px"
                style={{ marginLeft: "5px" }}
              />
              داشبرد
            </MenuItem>
            <MenuItem
              component={Link}
              to="/v2/profile/change-password"
              onClick={handleClose}
              className={classes.navButoon}
            >
              <img
                src={settingIcon}
                width="15px"
                style={{ marginLeft: "5px" }}
              />
              تغییر رمز عبور
            </MenuItem>
            <MenuItem onClick={ResetToken} className={classes.navButoon}>
              <img
                src={logoutIcon}
                width="15px"
                style={{ marginLeft: "5px" }}
              />
              خروج
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};
