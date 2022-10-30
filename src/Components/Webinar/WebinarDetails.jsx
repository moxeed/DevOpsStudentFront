import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ClassIcon from "@material-ui/icons/Class";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import ContentLoader from "react-content-loader";
import WebinarDetailTable from "./WebinarDetailTable";
import WebinarExamTable from "./WebinarExamTable";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px 30px",
    height: "auto",
    transition: "all 0.3s",
    "& p": { color: theme.palette.gray.main, padding: 5 },
  },

  IconDist: {
    marginLeft: "5px",
  },
  animationStyle: {
    animation: " $myEffect 1s infinite",
    animationTimingFunction: "linear",
    marginTop: 8,
    padding: 2,
  },
  posterLink: {
    height: "100%",
    maxHeight: "400px",
    width: "auto",
    maxWidth: "100%",
  },
  "@keyframes myEffect": {
    from: {
      color: "white",
    },
    to: {
      color: "#36A0FF",
    },
  },
  imagecard: {
    witdh: "auto",
    maxHeight: "200px",
  },
  root: {
    height: " 100%",
    color: theme.palette.gray.main,
  },
}));

export default function WebinarDetails({ data }) {
  const classes = useStyles();

  const courses = [
    ...new Set(data?.groupCourses.map((a) => a.course.courseName)),
  ];
  const groups = data?.groupCourses.map((a) => a.group.groupName);
  const names = data?.productProvider.map(
    (item) => item?.name + " " + item?.lastName
  );
  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid spacing={1} justifyContent="center" container>
        {data ? (
          <Grid item xs={12} className={classes.cardContainer}>
            <Paper className={classes.paper}>
              <Grid container>
                {data.poster && data.poster !== "" ? (
                  <Grid xs={12} container item justifyContent="center">
                    <img
                      alt="poster"
                      src={
                        window.config.API_BASE + "/File/Download/" + data.poster
                      }
                      className={classes.imagecard}
                    />
                  </Grid>
                ) : null}
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {"  "}
                  <PersonIcon className={classes.IconDist} /> ارائه دهندگان:{" "}
                  {names.join("، ")}
                </Typography>
                <Grid
                  item
                  xs={12}
                  style={{ display: "grid", placeItems: "center" }}
                >
                  {data.posterLink ? (
                    <img
                      src={data.posterLink}
                      alt="پوستر"
                      className={classes.posterLink}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} style={{ marginTop: "20px" }}>
                  <Typography
                    variant="h4"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: "#808080",
                    }}
                  >
                    {data?.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    {"  "} <ImportContactsIcon className={classes.IconDist} />{" "}
                    {"  "}نام درس:{"  "} {courses.join("، ")}
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    {"  "} <LibraryBooksIcon className={classes.IconDist} />{" "}
                    {"  "}گروه های آزمایشی : {"  "} {groups.join("، ")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    {"  "}
                    <SupervisorAccountIcon className={classes.IconDist} />{" "}
                    ظرفیت: {data?.capacity} نفر{" "}
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    {"  "}
                    <ClassIcon className={classes.IconDist} /> تعداد جلسات:{" "}
                    {data?.countOfSession} جلسه{" "}
                  </Typography>
                </Grid>
                <Grid container>
                  {data.webinarSchedules && <WebinarDetailTable data={data} />}
                  {data.webinarQuizzes?.length > 0 && (
                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <Typography
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                          }}
                        >
                          {"  "}{" "}
                          <LibraryAddCheckIcon className={classes.IconDist} />
                          آزمون های بازیابی درس:
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <WebinarExamTable data={data} />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ) : (
          <ContentLoader style={{ width: "100%", height: 200 }}>
            <rect x="30" y="5" rx="3" ry="3" width="100%" height="220" />
          </ContentLoader>
        )}
      </Grid>
    </Grid>
  );
}
