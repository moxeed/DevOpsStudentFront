import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import WebinarContentService from "../../Services/Product/WebinarContent";
import Countdown from "react-countdown";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getDiffDateTime,
  getIranDateTime,
} from "src/v2/components/utility/time";

const ShowLink = ({ webinarId, setIsPurchased, webinarSchedules }) => {
  if (!webinarSchedules) return <div></div>;

  const [status, setStatus] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [diffTime, setDiffTime] = useState();

  useEffect(() => {
    if (webinarSchedules) {
      getIranDateTime().then((res) => {
        for (let i = 0; i < webinarSchedules.length; i++) {
          if (res < new Date(webinarSchedules[i].endDateTime)) {
            getDiffDateTime(webinarSchedules[i].startDateTime).then(
              setDiffTime
            );
            return;
          }
        }
      });
    }
  }, [webinarSchedules]);

  const uploadData = () => {
    setLoading(true);
    if (webinarId !== undefined) {
      setIsPurchased(true);
      WebinarContentService.GetStatus({
        webinarId: webinarId,
        userId: GetUserId(),
        userFullName: localStorage.getItem("nF"),
        isProvider: false,
      })
        .then((res) => {
          setStatus(res.data);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (webinarId) uploadData();
  }, [webinarId, diffTime]);

  return (
    <Grid container style={{ justifyContent: "center" }}>
      {diffTime ? (
        <Countdown
          date={Date.now() + +diffTime}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return (
                <Grid style={{ justifyContent: "center" }}>
                  <Grid item xs={12}>
                    <a
                      href={status?.webinarLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: "20em", padding: "12px" }}
                      >
                        ???????? ???? ????????
                      </Button>
                    </a>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        marginTop: "20px",
                      }}
                    >
                      ???????? ???? ?????? ?????????????? ??????.
                    </Typography>
                  </Grid>
                </Grid>
              );
            }
            return (
              <Grid style={{ justifyContent: "center" }}>
                <Grid item xs={12}>
                  <a
                    href={status?.webinarLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      disabled={
                        (days === 0 && hours === 0 && minutes < 16) === false
                      }
                      variant="contained"
                      color="secondary"
                      style={{ width: "20em", padding: "12px" }}
                    >
                      ???????? ???? ????????
                    </Button>
                  </a>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      marginTop: "20px",
                    }}
                  >
                    {"???????? ??????????"}
                    {days > 0
                      ? hours > 0 || minutes > 0
                        ? ` ${days} ?????? ?? `
                        : ` ${days} ?????? `
                      : null}
                    {hours > 0
                      ? minutes > 0
                        ? ` ${hours} ???????? ?? `
                        : ` ${hours} ???????? `
                      : null}
                    {minutes > 0 ? ` ${minutes} ?????????? ` : null}
                    {days === 0 && hours === 0 && minutes === 0
                      ? ` ${seconds} ?????????? `
                      : null}
                    ???????? ???????????? ????{"\u200c"}??????.
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        />
      ) : loading ? (
        <CircularProgress
          color="primary"
          style={{ width: "20px", height: "20px" }}
        />
      ) : (
        <Grid>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              color: "#888",
            }}
          >
            ???????? ?????????????? ?????? ?????????? ???? ?????????? ?????????? ??????.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ShowLink;
