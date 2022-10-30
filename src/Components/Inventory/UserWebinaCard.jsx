import { Button, Card, Grid, Typography } from "@material-ui/core";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import React from "react";
import Countdown from "antd/lib/statistic/Countdown";
import { DateTime } from "../../Utility/Date/DateTime";

export default function UserWebinaCard({ data }) {
  const count = (d) => {
    const end = new Date(d);
    const now = new Date();
    return Date.now() + Math.abs(end - now);
  };
  const names = data?.providers.map((item) => item.name + " " + item.lastName);
  return (
    <Card style={{ padding: ".9em" }}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography
            variant="h5"
            component="p"
            style={{ display: "flex", alignItems: "center" }}
          >
            <PermMediaIcon style={{ color: "#74D670", marginLeft: "9px" }} />{" "}
            {data.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ display: "flex", alignItems: "center" }}>
            تاریخ برگزاری همایش:{" "}
            <DateTime date={new Date(data.holdigDateTime)} />
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ display: "flex", alignItems: "center" }}>
            ارائه دهندگان: {data.providers ? names.join("، ") : "تعیین نشده"}
          </Typography>
        </Grid>
        <Grid item>
          {data.webinarStatus ? (
            <>
              {data.webinarStatus === 1 ? (
                <Button className="Button" disabled>
                  غیر فعال
                </Button>
              ) : data.webinarStatus === 2 ? (
                <Typography style={{ textAlign: "right" }}>
                  <Countdown
                    value={count(data.date)}
                    format=" شروع تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
                    onFinish={() =>
                      alert(
                        data.title +
                          "در حال برگزاری است، لطفا همایش ها را بروز کرده و لینک ورود به این همایش را در کارت مربوطه دریافت کنید"
                      )
                    }
                  />
                </Typography>
              ) : data.webinarStatus === 3 ? (
                <a href={data.webinarLink} target="_blank" rel="noreferrer">
                  <Button className="Button">ورود به همایش</Button>
                </a>
              ) : data.webinarStatus === 4 ? (
                <Button className="Button" disabled>
                  مدرس وارد نشده است
                </Button>
              ) : (
                <Button className="Button">درحال بررسی</Button>
              )}
            </>
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
}
