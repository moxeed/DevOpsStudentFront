import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import classes from "./AboutUs.module.scss";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import theme from "src/v2/styles/theme";
import { Link } from "react-router-dom";
import { PanelService } from "src/v2/api/front-panel";

const AboutUs = () => {
  const [text, setText] = useState({
    title: "درباره ما",
    text: `            تیم رتبه های برتر از برترین های کنکور های 99 و 1400 هستند که بیش از
    دو سال سابقه شرکت در آزمون های کانون را داشته اند. ما در بخش رتبه
    های برتر سعی میکنیم تا بستری فراهم کنیم که دانش آموزان سراسر کشور
    بتوانند از تجربیات دانشجویان رتبه های برتر استفاده کنند.`,
  });
  const [video, setVideo] = useState({
    hash: "https://core.bamis.ir/api/v1/File/Download/LcKQWjbtlv5FWDAdOnt4",
  });

  React.useEffect(() => {
    PanelService.GetTextWithKey("aboutUs").then(setText);
    PanelService.GetVideoByKey("aboutUs").then(setVideo);
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} className={classes.AboutUsContainer}>
        <ColoredTitle
          color={theme.palette.lightCyan}
          title={text?.title ?? "درباره ما"}
        />
      </Grid>
      <Grid container item xs={12} justifyContent={"space-between"}>
        <Grid item xs={12} md={5} sx={{ py: 5, pr: 5, maxHeight: "40vh" }}>
          <video
            width="100%"
            height="100%"
            controls
            style={{ boxShadow: "-10px 10px 17px -5px rgba(0,0,0,0.53)" }}
          >
            <source
              src={
                video?.hash ??
                "https://core.bamis.ir/api/v1/File/Download/LcKQWjbtlv5FWDAdOnt4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 5 }} item>
          <Typography variant="h6" className={classes.mainText}>
            <span
              style={{ width: "100%" }}
              className={"ck-content " + classes.mainText}
              dangerouslySetInnerHTML={{
                __html: text?.text ?? "",
              }}
            ></span>
          </Typography>
          <Grid
            item
            container
            sx={{ my: 10 }}
            xs={12}
            justifyContent="flex-start"
          >
            <Grid item md={4} xs={6}>
              <BlueButton label="ارتباط با ما" type={Link} link="/AboutUS" />
            </Grid>
            <Grid item md={4} xs={6}>
              <BlueButton
                outline
                type={Link}
                link="/v2/work-with-us"
                label="همکاری با ما"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
