import * as React from "react";
import { Box, AppBar, Button, Toolbar, Stack } from "@mui/material";
import classes from "./NavbarMenu.module.scss";
import { Link } from "react-router-dom";
import { MenuRoutes } from "./Routes";
import Logo from "src/v2/assets/images/LogoV2.png";
import { AuthNav } from "../AuthNav/AuthNav";

const NavbarMenu = ({ top = {} }) => {
  return (
    <AppBar
      className={classes.NavbarMenu}
      sx={{
        display: { xs: "none", md: "flex" },
      }}
    >
      <Stack
        className={classes.navbar}
        direction="row"
        sx={{
          ...top,
        }}
      >
        <Toolbar>
          <Box
            justifyContent={"space-betwen"}
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              m: 5,
              p: 5,
            }}
          >
            <Link to="/">
              <img
                src={Logo}
                alt="bartarha"
                style={{ width: "auto", height: "10vh" }}
              />
            </Link>
            {MenuRoutes.map((page) => (
              <Link underline="none" key={page.id} to={page.id}>
                <Button className={classes.navButoon}>
                  {page.label}
                  {page?.icon}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
        <AuthNav />
      </Stack>
    </AppBar>
  );
};

export default NavbarMenu;
