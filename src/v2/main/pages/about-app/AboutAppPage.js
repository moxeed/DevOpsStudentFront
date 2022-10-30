import { Grid, Typography, Stack } from "@mui/material";
import AppInfo from "src/v2/assets/images/AbouApp.jpg";
import classes from "./AboutApp.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";

const AboutAppPage = () => {
  return (
    <Grid
      container
      className={classes.AboutAppContainer}
      sx={{ mt:20,fontWeight:"bold" }}
    >
      <Grid container justifyContent={"space-between"} item>
        <Grid xs={12} md={6} item sx={{ p: 4 }}>
          <Typography
            variant="h3"
            style={{ textAlign: "center", margin: "1em 0 1em 0" }}
          >
            اپلیکیشن برترها
          </Typography>

          <Typography variant="h6" className={classes.text}>
            در این نرم افزار شما می توانید هر لحظه از شبانه روز با رتبه های
            برتردر رشته خود ارتباط آنلاین برقرار کنید و سوالات درسی و مشاوره ای
            خود را از ایشان بپرسید. از طریق اپلیکیشن برترها شما می توانید در هر
            درسی که نیاز به رفع اشکال دارید با کمک رتبه های برتر مشکل خود را
            برطرف کنید.
          </Typography>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h6" className={classes.text}>
              <CheckCircleOutlineIcon
                sx={{ mr: 2, fontSize: "24px" }}
                className={classes.CheckCircleOutlineIcon}
              />
              ارسال سوال به صورت متنی (فایل های video,pdfوvoice)
            </Typography>
            <Typography variant="h6" className={classes.text}>
              <CheckCircleOutlineIcon
                sx={{ mr: 2, fontSize: "24px" }}
                className={classes.CheckCircleOutlineIcon}
              />
              برقراری تماس تصویری(فضای اسکای روم)
            </Typography>
            <Typography variant="h6" className={classes.text}>
              <CheckCircleOutlineIcon
                sx={{ mr: 2, fontSize: "24px" }}
                className={classes.CheckCircleOutlineIcon}
              />
              برقراری ارتباط آنلاین صوتی(تلفنی - آنلاین)
            </Typography>
          </Stack>
          <Grid
            item
            container
            sx={{ my: 10 }}
            xs={12}
            justifyContent="center"
          >
            <Grid item md={3} xs={6} container justifyContent="center">
              <BlueButton
                label="دانلود از بازار"
                func={() =>
                  window.open(
                    "https://cafebazaar.ir/app/ir.pcontinue.kanoon_students"
                  )
                }
              />
            </Grid>
            <Grid item md={3} xs={6} container justifyContent="center">
              <BlueButton
                label="دانلود مستقیم "
                func={() => {
                  location.href = "http://appstudent.mykanoon.ir/app/latest";
                }}
                outline
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" xs={12} md={6}>
          <img src={AppInfo} alt="banner" width="100%" height="auto" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutAppPage;
