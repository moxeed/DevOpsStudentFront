import classes from "./HelperHeader.module.scss";
import Whatsapp from "src/v2/assets/images/Icons/WhatsApp.svg";
import phone from "src/v2/assets/images/Icons/Call.svg";
import instagram from "src/v2/assets/images/Icons/Instagram.svg";
import Menu from "src/v2/assets/images/Icons/Menu.svg";
import download from "src/v2/assets/images/blackDownload.png";
import Logo from "src/v2/assets/images/LogoV2.png";
import * as React from "react";
import {
  Drawer,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
  Button,
  Hidden,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import theme from "src/v2/styles/theme";
import { MenuRoutes } from "../NavbarMenu/Routes";
import { AuthNav } from "../AuthNav/AuthNav";

const MenuDrawer = ({ anchor, toggleDrawer }) => {
  const [number] = React.useState({
    phone: "02141023000",
    text: "021-4102-3000",
  });
  const [whatsapp] = React.useState({
    phone: "+989029268665",
    text: "+98-902-926-8665",
  });

  return (
    <Drawer
      anchor={"left"}
      open={anchor}
      sx={{ width: "100%", backgroundColor: theme.palette.TealGreen }}
      variant={"persistent"}
      onClose={toggleDrawer}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          m: 4,
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ m: 4 }}>
          <CancelIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          m: 4,
        }}
      >
        {MenuRoutes.map((page) => (
          <React.Fragment key={page.id}>
            <Link to={page.id}>
              <Button
                size="large"
                style={{
                  marginRight: 4,
                  color: theme.palette.title,
                  fontSize: "1.2em",
                }}
              >
                {page.icon}
                {page.label}
              </Button>
            </Link>
            <Divider sx={{ width: "100%" }} />
          </React.Fragment>
        ))}
        <Grid
          container
          sx={{
            mt: 15,
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <Grid item>
            <Typography variant="h5">شماره ی پشتیبانی </Typography>{" "}
          </Grid>
          <Grid item>
            <Typography className={classes.description}>
              <a href={"tel:" + number.phone}>{number.text}</a>
              <img src={phone} alt="phone" />
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: 5,
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <Grid item>
            <Typography variant="h5">پشتیبانی در واتس{"\u200c"}اپ </Typography>{" "}
          </Grid>
          <Grid item>
            <Typography className={classes.description}>
              <a href={"https://wa.me/" + whatsapp.phone}>{whatsapp.text}</a>
              <img src={Whatsapp} alt="whatsapp" />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          margin: "2.5em 0",
          padding: ".1em",
        }}
      >
        <Divider
          sx={{ width: "100%", mb: 5, p: 2, "& span": { fontSize: "1.4em" } }}
        >
          دانلود اپلیکیشن برترها
        </Divider>
        <Grid container>
          <Grid item xs={6}>
            <Button variant={"none"}>
              <img
                style={{ width: "10.5em", height: "auto" }}
                src={download}
                alt=""
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant={"none"}>
              <img
                style={{ width: "10em", height: "auto" }}
                src="https://cdn.developers.cafebazaar.ir/2021/05/bazaar-badge2-300x89.png"
                alt=""
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

const HelperHeader = () => {
  const [anchor, setAnchor] = React.useState(false);
  const [number] = React.useState({
    phone: "02141023000",
    text: "021-4102-3000",
  });
  const [whatsapp] = React.useState({
    phone: "+989029268665",
    text: "+98-902-926-8665",
  });

  const [motto] = React.useState({
    text: "<h1>!با برترها، رتبه برتر شوید</h1>",
  });

  const toggleDrawer = () => {
    setAnchor(!anchor);
  };

  return (
    <Stack className={classes.HelperHeader}>
      <Grid container alignItems={"center"}>
        <Hidden mdUp>
          <Grid
            item
            xs={4}
            sm={0}
            md={0}
            container
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {" "}
            <img
              onClick={toggleDrawer}
              src={Menu}
              className={classes.logo}
              alt=" "
            />
          </Grid>
        </Hidden>
        <Grid
          item
          xs={4}
          sm={4}
          md={1}
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ visibility: { xs: "visibile", sm: "visibile", md: "hidden" } }}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="bartarha"
              style={{ width: "auto", height: "10vh", marginRight: 20 }}
            />
          </Link>
        </Grid>
        <Hidden mdDown>
          <Grid
            container
            item
            xs={0}
            sm={0}
            md={5}
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            justifyContent={"space-around"}
            alignContent={"flex-start"}
          >
            <Grid item>
              <Typography className={classes.description}>
                <a href={"https://wa.me/" + whatsapp.phone}>{whatsapp.text}</a>
                <img src={Whatsapp} alt=" " />
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.description}>
                <a href={"tel:" + number.phone}>{number.text}</a>
                <img src={phone} alt=" " />
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.description}>
                <a
                  href="https://instagram.com/bartarha_t"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bartarha_t
                </a>
                <img src={instagram} alt=" " />
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.description}>
                <a
                  href="https://instagram.com/bartarha_e"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bartarha_e
                </a>
                <img src={instagram} alt=" " />
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={0}
            sm={0}
            md={5}
            sx={{ display: { xs: "none", sm: "none", md: "flex" }, mt: 5 }}
            container
            justifyContent={"center"}
          >
            <Typography
              sx={{ "& h2": { fontSize: "1.2em", fontWeight: "bold" } }}
              className={classes.description}
              dangerouslySetInnerHTML={{
                __html: motto.text,
              }}
            ></Typography>
          </Grid>
        </Hidden>
        <Grid
          item
          xs={4}
          sm={4}
          md={1}
          container
          justifyContent={"center"}
          sx={{ visibility: { xs: "visibile", sm: "visibile", md: "hidden" } }}
        >
          <AuthNav />
        </Grid>
      </Grid>
      <MenuDrawer anchor={anchor} toggleDrawer={toggleDrawer} />
    </Stack>
  );
};

export default HelperHeader;
