import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardPdfQuiz from "../PdfMode/CardPdfQuiz";
import Countdown from "react-countdown";
import QuizTypeService from "../../../Services/Quiz/QuizType";
import CardInformation from "./CardInformation";
const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    paddingTop: 10,
  },
  btn: {
    margin: "5px",
    color: "rgb(60,205,179)",
    textAlign: "center",
    borderRadius: "32px",
    height: "30px",
    border: "1px solid rgb(60,205,179)",
    "&:hover,&.active": {
      backgroundColor: "rgb(60,205,179)",
      color: "#ffffff",
      border: "1px solid transparent",
    },
  },
}));
const PdfQuiz = ({ examId, quizId, handleComplete, renderer }) => {
  const classes = useStyles();
  const [number, setNumber] = useState();
  const [numQ, setNumQ] = useState(0);
  const [dataOffline, setDataOffline] = useState();

  useEffect(() => {
    if (examId) {
      QuizTypeService.GetPdfMode(examId).then((res) => {
        if (res?.success === false) {
          handleComplete();
          return null;
        }
        setDataOffline(res.data);
        setNumber(res.data.numOfQuestion);
      });
    }
  }, [examId, numQ]);

  return (
    <>
      {dataOffline ? (
        <Grid container item md={10} className={classes.root} spacing={1}>
          <Grid
            container
            style={{
              backgroundColor: "#41B64E",
              color: "white",
              bottom: 0,
            }}
          >
            <div
              style={{ width: "100%", backgroundColor: "#41B64E", bottom: 0 }}
            >
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                {dataOffline.quizTitle}
              </Typography>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                تعداد سوالات : {dataOffline.numOfQuestion}
              </Typography>
              <Countdown
                date={Date.now() + dataOffline.timeLeftSeconds * 1000}
                renderer={renderer}
                onComplete={handleComplete}
              />
            </div>
          </Grid>
          <Grid
            container
            item
            sm={12}
            md={12}
            xs={12}
            style={{
              backgroundColor: "white",
              color: "white",
              bottom: 0,
            }}
          >
            <CardInformation examId={examId} quizId={quizId} />
          </Grid>
          <Grid
            item
            md={12}
            style={{ backgroundColor: "white", borderRadius: 5, width: "100%" }}
          >
            <Grid item md={12} style={{ padding: 10 }}>
              <Typography>پاسخ برگ آزمون</Typography>
            </Grid>
            <Grid container style={{ direction: "ltr", width: "100%" }}>
              <Grid item xs={12} sm={12}>
                <div style={{ border: "1px solid #43BF46", width: "100%" }}>
                  {numQ === 0 ? (
                    <CardPdfQuiz
                      number={1}
                      dataOffline={dataOffline}
                      examId={examId}
                    />
                  ) : (
                    <CardPdfQuiz
                      number={numQ}
                      dataOffline={dataOffline}
                      examId={examId}
                    />
                  )}
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              style={{
                marginBottom: 50,
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {[...Array(number)].map((e, i) => (
                <Grid key={i} style={{ flexDirection: "revert" }}>
                  {1 < i < 150 && (number - i) * 10 < number + 10 ? (
                    <Button
                      className={classes.btn + " Button"}
                      onClick={() => setNumQ((number - (i + 1)) * 10 + 1)}
                    >
                      {(number - (i + 1)) * 10 + 1}-{(number - i) * 10}
                    </Button>
                  ) : null}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default PdfQuiz;
