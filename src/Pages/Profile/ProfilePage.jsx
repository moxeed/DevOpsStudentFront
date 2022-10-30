import { AppBar, Hidden, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import UserProfileEdit from "../../Components/ProfileOrder/UserProfileEdit";
import OrderTab from "../../Components/ProfileOrder/OrderTab";
import TabProfileQuiz from "../../Components/ProfileOrder/TabProfileQuiz";
import TabToturing from "../../Components/ProfileOrder/TabToturing";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Route, Router, useHistory, NavLink } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    minWidth: "300px",
  },
  activeLink: {
    borderBottom: "2px solid #5433d6 !important",
    color: "#5433d6 !important",
  },
  Link: {
    display: "flex",
    alignItems: "Center",
    justifyContent: "center",
    padding: "10px",
    fontSize: "14px",
    color: "#808080",
    cursor: "pointer",
    borderBottom: "2px solid #808080",
    boxSizing: "content-box",
    "&:hover": {
      color: "#5433d6",
    },
  },
  drawerPaper: {
    width: "100%",
    maxWidth: "400px",
  },
}));

function ProfilePage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List className={classes.root}>
      <Typography
        variant="h4"
        component="div"
        style={{ textAlign: "center", padding: 10 }}
      >
        پروفایل من
      </Typography>
      <NavLink
        exact
        to={"/v2/profile/change-password"}
        activeClassName={classes.activeLink}
        className={classes.Link}
        onClick={handleDrawerToggle}
      >
        <AddShoppingCartIcon /> تغییر رمز عبور
      </NavLink>
      <NavLink
        exact
        to={"/Profile/Orders"}
        activeClassName={classes.activeLink}
        className={classes.Link}
        onClick={handleDrawerToggle}
      >
        <AddShoppingCartIcon /> سفارشات من
      </NavLink>
      <NavLink
        exact
        to={"/Profile/Exam"}
        activeClassName={classes.activeLink}
        className={classes.Link}
        onClick={handleDrawerToggle}
      >
        <BorderColorIcon /> آزمون های من
      </NavLink>
      <NavLink
        exact
        to={"/Profile/Toturing"}
        activeClassName={classes.activeLink}
        className={classes.Link}
        onClick={handleDrawerToggle}
      >
        <ContactPhoneIcon /> تدریس خصوصی من
      </NavLink>
      {/* <NavLink
        exact
        to={"/Profile/User"}
        activeClassName={classes.activeLink}
        className={classes.Link}
        onClick={handleDrawerToggle}
      >
        <AccountCircleIcon /> ویرایش اطلاعات شخصی
      </NavLink> */}
    </List>
  );

  return (
    <>
      <Hidden mdUp>
        <AppBar>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="dark"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="dark">
              پروفایل من
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Grid container style={{ minHeight: "90vh" }}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor="right"
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
            <List className={classes.root}>{drawer}</List>
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Grid item md={3}>
            <List className={classes.root} style={{ position: "fixed" }}>
              {drawer}
            </List>
          </Grid>
        </Hidden>
        <Grid item md={9} xs={12} style={{ padding: 10 }}>
          <Hidden mdUp>
            <div style={{ marginBottom: "40px" }}></div>
          </Hidden>
          <Router history={useHistory()}>
            <Route path="/Profile/Orders" exact component={OrderTab} />
            <Route path="/Profile/Exam" exact component={TabProfileQuiz} />
            <Route path="/Profile/Toturing" exact component={TabToturing} />
            {/* <Route path="/Profile/User" exact component={UserProfileEdit} /> */}
          </Router>
        </Grid>
      </Grid>
    </>
  );
}
export default ProfilePage;
