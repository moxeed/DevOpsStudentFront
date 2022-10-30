import React from "react";
import Grid from "@material-ui/core/Grid";
import NotServer from "../../Assets/Images/NotServer.png";
import Countdown, { zeroPad } from "react-countdown";
import { Button, Card, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

export default function PageNotServer() {
  const history = useHistory();

  const renderer = ({ seconds }) => {
    return (
      <span>{zeroPad(seconds)} ثانیه دیگر به صفحه اصلی منتقل میشوید.</span>
    );
  };
  return (
    <Grid container justifyContent="center">
      <Card style={{ padding: 50, margin: 20, textAlign: "center" }}>
        <img src={NotServer} alt="banner" width="200px" />
        <Typography variant="h6" style={{ paddingTop: 10, fontWeight: "bold" }}>
          سایت در این لحظه پاسخگو نیست.
        </Typography>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {" "}
          لطفا از سرعت اینترنت خود مطمئن شوید و درصورت روشن بودن VPN آن را خاموش
          کنید.
        </Typography>
        <Typography variant="h6" style={{ paddingTop: 10, fontWeight: "bold" }}>
          درصورتی که مدام به این صفحه انتقال پیدا میکنید، سایت درحال توسعه
          میباشد و به زودی دوباره در دسترس خواهد بود.
        </Typography>
        <Typography variant="h6" style={{ paddingTop: 10, fontWeight: "bold" }}>
          <Countdown
            date={Date.now() + 15000}
            onComplete={() => {
              history.push("/");
            }}
            renderer={renderer}
          />
        </Typography>

        <Button
          color="secondary"
          to="/"
          variant="contained"
          size="large"
          style={{ margin: "1em" }}
          component={Link}
        >
          بازگشت به خانه
        </Button>
      </Card>
    </Grid>
  );
}
