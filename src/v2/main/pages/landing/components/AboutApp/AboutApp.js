import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import image from "src/v2/assets/images/Vector/App.png";
import classes from "./AboutApp.module.scss";
import theme from "src/v2/styles/theme";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";
import { Link } from "react-router-dom";
import { PanelService } from "src/v2/api/front-panel";

const BartarhaApp = () => {
  const [text, setText] = useState({
    title: "اپلیکیشن برترها",
    text: ` تدریس آنلاین تصویری با برتر های 99، سوالات درسی خود را از رتبه های
    برتر کنکور بپرسید`,
  });

  React.useEffect(() => {
    PanelService.GetTextWithKey("aboutApp")
      .then(setText)
      .catch(() =>
        setText({
          title: "اپلیکیشن برترها",
          text: ` تدریس آنلاین تصویری با برتر های 99، سوالات درسی خود را از رتبه های
      برتر کنکور بپرسید`,
        })
      );
  }, []);
  return (
    <Grid container className={classes.AboutAppContainer}>
      <ColoredTitle
        color={theme.palette.blueBell}
        title={text?.title ?? "اپلیکیشن برترها"}
      />
      <Grid container justifyContent={"space-between"} item>
        <Grid xs={12} md={7} item sx={{ p: 4 }}>
          <Stack sx={{ gap: 5 }}>
            <span
              style={{ width: "100%" }}
              className={"ck-content " + classes.mainText}
              dangerouslySetInnerHTML={{
                __html: text?.text ?? "",
              }}
            ></span>
          </Stack>
          <Grid
            item
            container
            sx={{ my: 10 }}
            xs={12}
            justifyContent="flex-start"
          >
            <Grid item md={5} xs={6}>
              <BlueButton
                type={Link}
                link="/v2/about-app"
                label="دریافت اپلیکیشن"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          xs={12}
          md={5}
          sx={{ display: { sm: "none", md: "flex" } }}
        >
          <img src={image} style={{ height: "auto", width: "100%" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BartarhaApp;
