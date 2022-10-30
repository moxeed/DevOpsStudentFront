import React, { useState } from "react";
import {
  makeStyles,
  Fab,
  Toolbar,
  AppBar,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Appbar.scss";
import { useAuthentication } from "../../v2/components/slice/useAuthentication";
import Logo from "src/v2/assets/images/LogoV2.png";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "85px",
    bottom: "0",
    left: "0",
    top: "auto",
    display: "flex",
    justifyContent: "center",
    boxShadow: "5px 10px #888888",
  },
  ItemText: {
    fontWeight: "700",
    fontSize: "15px",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  circle: {
    width: "100%",
    height: "99%",
  },
  drawerPaper: {
    width: "100%",
    maxWidth: "500px",
    flexShrink: 0,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  service: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#5433d6",
      borderBottom: "2px solid #5433d6",
    },
  },
  dissableLink: {
    textAlign: "center",
    color: "#9d9d9d",
    pointerEvents: "none",
    cursor: "default",
    textDecoration: "none",
    opacity: ".5",
  },
  edgeEnd: {
    width: "60% !important",
    height: "70% !important",
    borderRadius: "50% !important",
    color: "#5433d6 !important",
    backgroundColor: "#fff !important",
    "&:hover": {
      backgroundColor: "#fff !important",
    },
  },
  buttonIcon: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "42%",
    height: "30%",
  },
  drawerHeader: {
    left: 0,
    width: "100%",
    display: "flex",
    padding: "0 20px",
  },
}));

export default function Appbar({ barItems, isLoggedIn }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [condition, setCondition] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle2 = () => {
    setCondition(!condition);
  };
  const { LogoutUser } = useAuthentication();
  const items = barItems.map((item, i) => (
    <Link
      key={i}
      onClick={handleDrawerToggle}
      to={item.route}
      style={{ color: "#808080" }}
    >
      <ListItem
        button
        component="a"
        className={item.disabled ? classes.dissableLink : classes.service}
        divider={true}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          classes={{ primary: classes.ItemText }}
          primary={item.title}
        />
      </ListItem>
    </Link>
  ));
  items.push(
    <>
      <Link
        key={4}
        onClick={() => {
          handleDrawerToggle();
          LogoutUser();
        }}
        to={isLoggedIn ? "/" : "/v2/Identity/login"}
        style={{ color: "#9d9d9d" }}
      >
        <ListItem
          button
          component="a"
          className={classes.service}
          divider={true}
        >
          <ListItemIcon>
            {isLoggedIn ? <PowerSettingsNewIcon /> : <PersonAddIcon />}
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.ItemText }}
            primary={isLoggedIn ? "خروج " : "ورود"}
          />
        </ListItem>
      </Link>
    </>
  );
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <div className={classes.buttonIcon}>
          <Button
            edge="end"
            style={{ background: "none" }}
            className={classes.edgeEnd + "Button"}
            onClick={handleDrawerToggle}
          >
            {" "}
            <div style={{ color: "#5433d6" }}>
              <MenuIcon style={{ fontSize: 28 }} />
              <p style={{ margin: 0, fontSize: "14px" }}> محصولات </p>
            </div>
          </Button>
        </div>
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              className={classes.iconClose}
              onClick={handleDrawerToggle}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
          <List>{items}</List>
        </Drawer>
        <div className="blob-nav">
          <div className="toggle" onClick={handleDrawerToggle2}>
            <Fab color="inherit" aria-label="add" className={classes.fabButton}>
              <Link to="/">
                <Avatar
                  variant="circular"
                  className={classes.circle}
                  src={Logo}
                />
              </Link>
            </Fab>
          </div>
        </div>
        <div className={classes.grow} />
        {isLoggedIn ? (
          <div className={classes.buttonIcon}>
            <Button
              edge="end"
              style={{ background: "none" }}
              className={classes.edgeEnd + " Button"}
            >
              {" "}
              <Link style={{ color: "#5433d6" }} to="/Profile/Orders">
                <PersonIcon style={{ fontSize: 28 }} />
                <p style={{ margin: 0, fontSize: "14px" }}> پروفایل</p>
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className={classes.buttonIcon}>
              <Button
                className={classes.edgeEnd + "Button"}
                edge="end"
                style={{ background: "none" }}
              >
                <Link style={{ color: "#5433d6" }} to="/v2/Identity/login">
                  <ExitToAppIcon style={{ fontSize: 28 }} />
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    {" "}
                    ورود یا ثبت نام
                  </p>
                </Link>
              </Button>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
