import { Grid, ListItem, Paper, Typography } from "@mui/material";
import Background from "src/v2/assets/images/aboutUs/background.png";
import CallIcon from "@mui/icons-material/Call";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import EventIcon from "@mui/icons-material/Event";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { makeStyles } from "@material-ui/core";
// todo
// delete it, create new module. file
const useStyle = makeStyles(() => ({
  root: {
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    "grid-template-columns": "85%",
    backgroundPosition: "center",
    maxHeight: "auto",
    display: "flex",
  },
  social: {
    marginTop: "5em",
    marginRight: "12em",
  },
  paper: {
    border: "none",
    width: "fit-content",
    maxWidth: 200,
    boxShadow: "none !important",
    textAlign: "center",
    backgroundColor: "#555FD8 !important",
    marginTop: "10em",
  },
  papertext2: {
    border: "none",
    width: "fit-content",
    boxShadow: "none !important",
    backgroundColor: "rgba(246,245,247,0.5) !important",
  },
  content2: {
    width: "100%",
    maxWidth: 800,
    padding: "10px",
    alignSelf: "flex-start",
  },
  colorLink2: {
    fontSize: 10,
    color: "#555FD8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#ebc334",
    },
  },
  text2: {
    fontWeight: "bolder",
    color: "#fff",
    fontSize: 18,
    padding: 5,
  },
  listText2: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bolder !important",
    color: "#555FD8",
  },
}));
// needs refactor
export default function MobileAboutUs() {
  const classes = useStyle();

  return (
    <Grid className={classes.root + " Form-Paper"}>
      <Grid className={classes.content2} xs={12}>
        <Grid container>
          <Grid
            xs={12}
            item
            alignItems="center"
            container
            justifyContent="center"
          >
            <Paper className={classes.paper}>
              <Grid xs={12} item>
                <Typography className={classes.text2}>
                  شماره های پشتیبانی
                </Typography>
                <Grid xs={12} container ju>
                  <Grid xs={12} item>
                    <span className={classes.text2}>02141023000</span>
                  </Grid>
                  <Grid xs={12} item>
                    <span className={classes.text2}>02141023333</span>
                  </Grid>
                  <Grid xs={12} item>
                    <span className={classes.text2}>02141023222</span>
                  </Grid>
                  <Grid xs={12} item style={{ marginTop: "0.5em" }}>
                    <span className={classes.text2}>
                      شماره تماس : 09170556426{" "}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            xs={12}
            item
            alignItems="center"
            container
            justifyContent="center"
            style={{ marginTop: "3em", marginRight: "1em" }}
          >
            <Paper className={classes.papertext2}>
              <ListItem style={{ textAlign: "right", padding: "0" }}>
                <Typography className={classes.listText2}>
                  {" "}
                  <CallIcon style={{ color: "#555FD8", width: "8%" }} />
                  {"  "}
                  تماس آنلاین با رتبه های برتر کنکور
                </Typography>
              </ListItem>
              <ListItem style={{ textAlign: "right", padding: "0" }}>
                <Typography className={classes.listText2}>
                  <LocalLibraryIcon style={{ color: "#555FD8", width: "5%" }} />
                  {"  "}
                  مشاوره و برنامه ریزی درسی به صورت آنلاین توسط رتبه های برتر
                </Typography>
              </ListItem>
              <ListItem style={{ textAlign: "right", padding: "0" }}>
                <Typography className={classes.listText2}>
                  {" "}
                  <QuestionAnswerIcon
                    style={{ color: "#555FD8", width: "5%" }}
                  />
                  {"  "}
                  رفع اشکال درسی و پاسخ گوی آنلاین به سوالات علمی شما
                </Typography>
              </ListItem>
              <ListItem style={{ textAlign: "right", padding: "0" }}>
                <Typography className={classes.listText2}>
                  <EventIcon style={{ color: "#555FD8", width: "8%" }} />
                  {"  "}
                  مشاوره و برنامه ریزی درسی ماهیانه
                </Typography>
              </ListItem>
            </Paper>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            className={classes.social}
          >
            <Paper className={classes.papertext2}>
              <Grid xs={7} item container>
                <Grid item xs={12}>
                  <Typography className={classes.listText2}>
                    <a
                      href="https://instagram.com/bartarha_t"
                      className={classes.colorLink2}
                    >
                      <InstagramIcon style={{ width: "15%" }} />
                      اینستاگرام تجربی
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.listText2}>
                    <a
                      href="https://instagram.com/bartarha_e"
                      className={classes.colorLink2}
                    >
                      <InstagramIcon style={{ width: "15%" }} />
                      اینستاگرام انسانی
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={7} item container>
                <Grid item xs={12}>
                  <Typography className={classes.listText2}>
                    <a
                      href="https://t.me/bartarha_t"
                      className={classes.colorLink2}
                    >
                      <TelegramIcon style={{ width: "15%" }} />
                      تلگرام تجربی
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.listText2}>
                    <a
                      href="https://t.me/bartarha_e"
                      className={classes.colorLink2}
                    >
                      <TelegramIcon style={{ width: "15%" }} />
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
  );
}
