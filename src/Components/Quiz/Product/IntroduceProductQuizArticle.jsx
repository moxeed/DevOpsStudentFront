import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import JDate from "jalali-date";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { QuizCourseSelector } from "./QuizCourseSelector";
const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid #F8F8F8",
    padding: 10,
    margin: "10px",
    "& h6": {
      padding: 5,
    },
    marginBottom: 50,
  },

  textType: {
    textAlign: "right",
    color: "#7d7d7d",
    fontWeight: "bold",
    paddingTop: 10,
    "@media (max-width: 970px)": {
      padding: "0 10px",
    },
  },
  hashtagStyle: {
    backgroundColor: "#80b3dd",
    width: "10%",
    color: "white",
    height: 20,
    border: "none",
    borderRadius: 5,
    textAlign: "center",
    padding: 5,
    margin: 2,
    cursor: "pointer",
  },
  table: {
    "& td": { border: "1px solid black", padding: 10 },
  },
}));

export default function IntroduceProductQuizArticle({ data }) {
  const classes = useStyles();

  return (
    <>
      {data ? (
        <Grid container xs={12} md={12} className={classes.paper}>
          <Grid item md={3}>
            {data.createdDateTime ? (
              <Grid
                item
                md={12}
                style={{
                  marginRight: 30,
                }}
              >
                <Typography
                  style={{
                    color: "#7d7d7d",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CalendarTodayIcon style={{ marginLeft: "5px" }} />
                  {new JDate(new Date(data?.createdDateTime)).format(
                    "dddd DD MMMM YYYY"
                  )}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid
            container
            style={{
              fontSize: "12px",
              fontWeight: "200",
              paddingTop: " 15px",
              right: 10,
            }}
          >
            <Typography
              variant="h6"
              component="p"
              style={{ padding: 10, lineHeight: 2, width: "100%" }}
            >
              <div style={{ textAlign: "center", witdh: "100%" }}>

                <QuizCourseSelector />
              </div>
            </Typography>
            <Grid
              item
              xs={12}
              md={12}
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "6px ",
              }}
            >
              <Link to="/Selection/Product/CourseQuiz">
                <Button
                  className="Button"
                  style={{ fontSize: "20px", width: "250px" }}
                >
                  دیدن آزمون ها
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <circle cx="120" cy="100" r="100" />
        </ContentLoader>
      )}
    </>
  );
}
