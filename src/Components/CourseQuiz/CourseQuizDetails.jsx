import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { DateTime } from "../../Utility/Date/DateTime";
import ContentLoader from "react-content-loader";
import { Timeline } from "antd";
import FormatListNumberedRtlIcon from "@material-ui/icons/FormatListNumberedRtl";
import QuizStatusButton from "../Quiz/Product/QuizStatusButton";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "5px 15px",
    height: "auto",
    transition: "all 0.3s",
    "@media (max-width: 768px)": {
      minHeight: "0px",
    },
    width: "100%",
    textAlign: "center",
  },
  textTypo: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.gray,
    paddingRight: 20,

    textAlign: "center",
  },
  IconDist: {
    marginLeft: "5px",
  },
  root: {
    alignItems: "center",
  },
}));
export default function CourseQuizDetails({ data }) {
  const classes = useStyles();

  return (
    <Grid container md={12} justifyContent="center" style={{ color: "grey" }}>
      <>
        {data ? (
          <Paper className={classes.paper}>
            {data.quizzes.length > 0 ? (
              data.quizzes.map((d, i) => (
                <div key={i} style={{ borderBottom: "1px solid #38AB4B" }}>
                  <Grid container item md={12} justifyContent="center">
                    <Grid
                      item
                      md={4}
                      xs={12}
                      sm={6}
                      container
                      alignItems="center"
                      justifyContent="center"
                      style={{ flexDirection: "column" }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color: "#38AB4B",
                          paddingTop: 10,
                        }}
                      >
                        {d?.quizTitle}
                      </Typography>
                      <QuizStatusButton
                        status={d.status}
                        quizId={d.quizId}
                        startDate={d.startDate}
                        resultDate={d.resultDate}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      md={4}
                      sm={3}
                      xs={6}
                      className={classes.root}
                    >
                      <Grid item md={4} xs={12}>
                        <Typography className={classes.textTypo}>
                          <ImportContactsIcon className={classes.IconDist} />{" "}
                          {data?.courseName}
                        </Typography>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Typography className={classes.textTypo}>
                          <AccessTimeIcon className={classes.IconDist} />{" "}
                          {d?.totalTimeMinutes} دقیقه
                        </Typography>
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <Typography className={classes.textTypo}>
                          <FormatListNumberedRtlIcon
                            className={classes.IconDist}
                          />{" "}
                          {d?.questionCount} سوال
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item md={4} xs={10} sm={3}>
                      <Timeline
                        style={{
                          direction: "ltr",
                          marginTop: 50,
                        }}
                      >
                        <Timeline.Item>
                          زمان شروع : <DateTime date={new Date(d?.startDate)} />
                        </Timeline.Item>
                        <Timeline.Item color="red">
                          زمان پایان : <DateTime date={new Date(d?.endDate)} />
                        </Timeline.Item>
                      </Timeline>
                    </Grid>
                  </Grid>
                </div>
              ))
            ) : (
              <Typography>محصولی برای نمایش وجود ندارد</Typography>
            )}
          </Paper>
        ) : (
          <ContentLoader style={{ width: "100%", height: 200 }}>
            <rect x="30" y="5" rx="3" ry="3" width="100%" height="220" />
          </ContentLoader>
        )}
      </>
    </Grid>
  );
}
