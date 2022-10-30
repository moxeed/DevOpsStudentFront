import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import theme from "src/v2/styles/theme";
import image from "src/v2/assets/images/Vector/ContactUs.svg";
import { PanelService } from "src/v2/api/front-panel";

const ContactUs = () => {
  const [text, setText] = useState({
    title: "برترها در فضای مجازی",
    text: "ما را در فضای مجازی دنبال کنید.",
  });

  React.useEffect(() => {
    PanelService.GetTextWithKey("socialMedia").then(setText);
  }, []);

  return (
    <Grid item md={12} container>
      <Grid item md={6} xs={12} container>
        <Grid item xs={6}>
          <ColoredTitle
            color={theme.palette.babyPink}
            title={text?.title ?? "برترها در فضای مجازی"}
          />
        </Grid>
        <Grid sx={{ p: 5 }} item xs={12}>
          <Typography
            sx={{
              "& h2 strong, & h2 a, &h2": {
                fontSize: "1.2em",
                fontWeight: "bold",
                lineHeight: "2",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: text?.text ?? "ما را در فضای مجازی دنبال کنید.",
            }}
          ></Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
      >
        <img src={image} width="60%" />
      </Grid>
    </Grid>
  );
};

export default ContactUs;
