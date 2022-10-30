import React from "react";
import {
  Grid,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Background from "../../Assets/Images/Poll.jpg";
import CallIcon from "@material-ui/icons/Call";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EventIcon from "@material-ui/icons/Event";
import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
const useStyle = makeStyles(() => ({
  root: {
    backgroundImage: `url(${Background})`,
    "grid-template-columns": "85%",
    maxHeight: "90vh",
  },
  paper: {
    border: "none",
    width: "100%",
    maxWidth: 800,
    boxShadow: "none !important",
    textAlign: "center",
  },
  content: {
    padding: "10px",
  },
  intro: {
    margin: "5px 10px",
    fontSize: 25,
    borderBottom: "1px solid #40B44F",
    textAlign: "center",
  },
  colorLink: {
    color: "#4EC74F",
    display: "flex",
    padding: "5px",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#39AD4C",
    },
  },
  colorText: {
    color: "#7D7D7D",
    textDecoration: "none",
    cursor: "auto",
    "&:hover": {
      color: "#7D7D7D",
    },
  },
}));

export default function AboutUsPage() {
  const classes = useStyle();

  return (
    <Grid className={classes.root + " Form-Paper"}>
      <Paper className={classes.paper}>
        <Grid className={classes.content} xs={12}>
          <Typography className={classes.intro}>گروه آموزشی برترها</Typography>
          <Grid container spacing={2}>
            <Grid
              xs={12}
              sm={4}
              item
              alignItems="center"
              justifyContent="center"
              container
            >
              <a href="https://cafebazaar.ir/app/ir.pcontinue.kanoon_students">
                <img src="https://core.bamis.ir/api/v1/File/Download/3xGmZjA3aZUZeTgJZlMI" width="110px" alt="banner"/>
              </a>
            </Grid>
            <Grid xs={12} sm={7} item alignItems="center" container>
              <List style={{ width: "100%" }}>
                <ListItem style={{ textAlign: "right", padding: "0" }}>
                  <ListItemText>
                    {" "}
                    <CallIcon style={{ color: "#4EC74F" }} />
                    {"  "}
                    تماس آنلاین با رتبه های برتر کنکور
                  </ListItemText>
                </ListItem>
                <ListItem style={{ textAlign: "right", padding: "0" }}>
                  <ListItemText>
                    <LocalLibraryIcon style={{ color: "#4EC74F" }} />
                    {"  "}
                    مشاوره و برنامه ریزی درسی به صورت آنلاین توسط رتبه های برتر
                  </ListItemText>
                </ListItem>
                <ListItem style={{ textAlign: "right", padding: "0" }}>
                  <ListItemText>
                    {" "}
                    <QuestionAnswerIcon style={{ color: "#4EC74F" }} />
                    {"  "}
                    رفع اشکال درسی و پاسخ گوی آنلاین به سوالات علمی شما
                  </ListItemText>
                </ListItem>
                <ListItem style={{ textAlign: "right", padding: "0" }}>
                  <ListItemText>
                    <EventIcon style={{ color: "#4EC74F" }} />
                    {"  "}
                    مشاوره و برنامه ریزی درسی ماهیانه
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            alignItems="center"
            justifyContent="center"
            container
          >
            <Grid xs={12} sm={6} item>
              <Typography style={{ padding: "10px" }}>
                شماره های پشتیبانی
              </Typography>
              <Grid xs={12} container ju>
                <Grid xs={4} item>
                  <span className={classes.colorText}>02141023000</span>
                </Grid>
                <Grid xs={4} item>
                  <span className={classes.colorText}>02141023333</span>
                </Grid>
                <Grid xs={4} item>
                  <span className={classes.colorText}>02141023222</span>
                </Grid>
                <Grid xs={12} item>
                  <span className={classes.colorText}>
                    شماره تماس : 09170556426{" "}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} container item>
              <Grid xs={12} item style={{ textAlign: "center" }}>
                <Typography style={{ padding: "10px" }}>
                  صفحات مجازی برترها
                </Typography>
              </Grid>
              <Grid xs={12} item container>
                <Grid xs={6} item>
                  <a
                    href="https://instagram.com/bartarha_t"
                    className={classes.colorLink}
                  >
                    <InstagramIcon style={{ marginLeft: "10px" }} />
                    اینستاگرام تجربی
                  </a>
                </Grid>
                <Grid xs={6} item>
                  <a
                    href="https://instagram.com/bartarha_e"
                    className={classes.colorLink}
                  >
                    <InstagramIcon style={{ marginLeft: "10px" }} />
                    اینستاگرام انسانی
                  </a>
                </Grid>
              </Grid>
              <Grid xs={12} item container>
                <Grid xs={6} item>
                  <a
                    href="https://t.me/bartarha_t"
                    className={classes.colorLink}
                  >
                    <TelegramIcon style={{ marginLeft: "10px" }} />
                    تلگرام تجربی
                  </a>
                </Grid>
                <Grid xs={6} item>
                  <a
                    href="https://t.me/bartarha_e"
                    className={classes.colorLink}
                  >
                    <TelegramIcon style={{ marginLeft: "10px" }} />
                    تلگرام انسانی
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
