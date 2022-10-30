import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Grid, Menu } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SchoolIcon from "@material-ui/icons/School";
import PaymentIcon from "@material-ui/icons/Payment";
import UserStatus from "./UserStatus";
import Logo from "src/v2/assets/images/LogoV2.png";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#43BF46",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
export default function Navbar({ navItems, isLoggedIn }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  const Products = [
    {
      route: "/Selection/Product/Webinar/3/free",
      icon: <PaymentIcon fontSize="small"></PaymentIcon>,
      title: "همایش های رایگان",
    },
    {
      route: "/Selection/Product/Webinar/3",
      icon: <SchoolIcon fontSize="small"></SchoolIcon>,
      title: "کلاس های انلاین سالانه",
    },
  ].map((item, i) => (
    <a
      key={i}
      href={item.route}
      style={{
        color: "#7d7d7d",
        margin: "5px 0px",
      }}
    >
      <StyledMenuItem onClick={handleClose}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={item.title}
        />
      </StyledMenuItem>
    </a>
  ));
  const NavbarItems = navItems.map((item, i) => (
    <NavLink
      key={i}
      exact
      to={item.route}
      activeClassName={item.disabled ? null : classes.activeLink}
      className={item.disabled ? classes.dissableLink : classes.underlineNone}
    >
      {item.icon} {item.title}
    </NavLink>
  ));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: "#fff" }}>
          <Grid className={classes.logo}>
            <NavLink to="/">
              <img src={Logo} className={classes.Img} alt="logo" />
            </NavLink>
          </Grid>
          <Typography variant="h6" className={classes.tabs}>
            {NavbarItems.slice(0, 1)}
            <div>
              <Typography
                onClick={handleClick}
                className={classes.underlineNone}
                style={{ display: "flex", alignItems: "center" }}
              >
                {" "}
                <SchoolIcon fontSize="small" /> {"  همایش های آنلاین  "}{" "}
                <ArrowDropDownIcon fontSize="large" />{" "}
              </Typography>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {Products}
              </StyledMenu>
            </div>
            {NavbarItems.slice(2)}
          </Typography>
          <UserStatus isLoggedIn={isLoggedIn} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
