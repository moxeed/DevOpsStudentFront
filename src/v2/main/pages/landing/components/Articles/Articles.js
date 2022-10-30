import React from "react";
import { Grid, Typography } from "@mui/material";
import clasess from "./Articles.module.scss";
import timer from "src/v2/assets/images/Icons/Timer.svg";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import theme from "src/v2/styles/theme";

const Articles = () => {
  return (
    <Grid container>
      <Grid
        sx={{
          position: "relative",
          mb: 20,
          "@media screen and (max-width: 600px)": {
            mb: 0,
          },
        }}
      >
        <Grid
          className="TitleBackground"
          sx={{ backgroundColor: "#d5d4ea" }}
        ></Grid>
        <ColoredTitle color={theme.palette.blueBell} title={"مقالات"} />
      </Grid>
      <Grid
        container
        sx={{
          paddingBlock: 20,
        }}
      >
        <Grid
          xs={12}
          container
          item
          justifyContent={"space-evenly"}
          rowSpacing={20}
        >
          {[...Array(8)].map((i) => (
            <Grid item sm={6} xs={12} key={i}>
              <div className={clasess.text}>
                <mark>
                  * برنامه ی آزمون های آمادگی برای امتحانات مدرسه _ اردیبشهت و
                  خرداد _ محتوای یک مقاله
                </mark>
                <Typography className={clasess.time}>
                  <img src={timer} alt=" " />
                  شنبه 27 فروردین
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Articles;
