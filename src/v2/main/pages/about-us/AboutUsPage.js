import React from "react";
import back from "src/v2/assets/images/aboutUs/background2.png";
import logo from "src/v2/assets/images/LogoV2.png";
import MobileAboutUs from "./MobileAboutUs";
import classes from "./AboutUsPage.module.scss";
import { Grid, Hidden, ListItem, Paper, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import EventIcon from "@mui/icons-material/Event";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export default function AboutUsPage() {
  return (
    <>
      <Hidden mdDown>
        <Grid className={classes.root} sx={{ backgroundImage: `url(${back})` }}>
          <Grid className={classes.content} xs={12}>
            <Grid container>
              <Grid
                xs={12}
                sm={4}
                item
                alignItems="center"
                justifyContent="center"
                container
              >
                <a href="https://cafebazaar.ir/app/ir.pcontinue.kanoon_students">
                  <img src={logo} width="150px" alt="banner" />
                </a>
              </Grid>
              <Grid
                xs={6}
                sm={6}
                itemf
                sx={{ display: "flex-end" }}
                alignItems="center"
                container
                justifyContent="center"
              >
                <Paper className={classes.papers}>
                  <Grid xs={12} item>
                    <Typography
                      className={classes.textstyle}
                      sx={{ padding: "10px" }}
                    >
                      شماره های پشتیبانی
                    </Typography>
                    <Grid xs={12} container ju>
                      <Grid xs={12} item>
                        <span className={classes.textstyle}>02141023000</span>
                      </Grid>
                      <Grid xs={12} item>
                        <span className={classes.textstyle}>02141023333</span>
                      </Grid>
                      <Grid xs={12} item>
                        <span className={classes.textstyle}>02141023222</span>
                      </Grid>
                      <Grid xs={12} item sx={{ padding: "10px" }}>
                        <span className={classes.textstyle}>
                          شماره تماس : 09170556426{" "}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              alignItems="center"
              justifyContent="center"
              container
              className={classes.items}
            >
              <Paper className={classes.papertext}>
                <Grid item>
                  <ListItem sx={{ textAlign: "right", padding: "0" }}>
                    <Typography className={classes.listText}>
                      {" "}
                      <CallIcon sx={{ color: "#555FD8" }} />
                      {"  "}
                      تماس آنلاین با رتبه های برتر کنکور
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ textAlign: "right", padding: "0" }}>
                    <Typography className={classes.listText}>
                      <LocalLibraryIcon sx={{ color: "#555FD8" }} />
                      {"  "}
                      مشاوره و برنامه ریزی درسی به صورت آنلاین توسط رتبه های
                      برتر
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ textAlign: "right", padding: "0" }}>
                    <Typography className={classes.listText}>
                      {" "}
                      <QuestionAnswerIcon sx={{ color: "#555FD8" }} />
                      {"  "}
                      رفع اشکال درسی و پاسخ گوی آنلاین به سوالات علمی شما
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ textAlign: "right", padding: "0" }}>
                    <Typography className={classes.listText}>
                      <EventIcon sx={{ color: "#555FD8" }} />
                      {"  "}
                      مشاوره و برنامه ریزی درسی ماهیانه
                    </Typography>
                  </ListItem>
                </Grid>
              </Paper>
              <Grid
                xs={12}
                item
                alignItems="center"
                justifyContent="center"
                container
                sx={{ marginTop: "5em" }}
              >
                <Paper className={classes.papertext}>
                  <Grid xs={7} item container>
                    <Grid item xs={12}>
                      <Typography className={classes.listText}>
                        <a
                          href="https://instagram.com/bartarha_t"
                          className={classes.colorLink}
                        >
                          <InstagramIcon sx={{ width: "15%" }} />
                          اینستاگرام تجربی
                        </a>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.listText}>
                        <a
                          href="https://instagram.com/bartarha_e"
                          className={classes.colorLink}
                        >
                          <InstagramIcon style={{ width: "15%" }} />
                          اینستاگرام انسانی
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid xs={7} item container>
                    <Grid item xs={12}>
                      <Typography className={classes.listText}>
                        <a
                          href="https://t.me/bartarha_t"
                          className={classes.colorLink}
                        >
                          <TelegramIcon sx={{ width: "15%" }} />
                          تلگرام تجربی
                        </a>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.listText}>
                        <a
                          href="https://t.me/bartarha_e"
                          className={classes.colorLink}
                        >
                          <TelegramIcon sx={{ width: "15%" }} />
                          تلگرام انسانی
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MobileAboutUs />
      </Hidden>
    </>
  );
}
