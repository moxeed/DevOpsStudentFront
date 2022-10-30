import React, { useState, useEffect } from "react";
import CardInformation from "./CardInformation";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AnswerCard from "./AnswerCard";
import QuizTypeService from "../../../Services/Quiz/QuizType";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    paddingTop: 15,
    marginBottom: 50,
  },
  styleCard: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "100%",
  },
}));
const PdfQuiz = ({ examId, quizId, handleComplete, renderer }) => {
  const classes = useStyles();
  const [dataOffline, setDataOffline] = useState();
  useEffect(() => {
    if (examId) {
      QuizTypeService.GetPdfMode(examId).then((res) => {
        if (res?.success === false) {
          handleComplete();
          return null;
        }
        setDataOffline(res.data);
      });
    }
  }, [examId]);

  return (
    <>
      {dataOffline ? (
        <Grid container item md={11} className={classes.root} spacing={1}>
          <Grid item md={3}>
            <CardInformation
              dataOffline={dataOffline}
              examId={examId}
              quizId={quizId}
              handleComplete={handleComplete}
              renderer={renderer}
            />
          </Grid>
          <Grid item md={9} className={classes.styleCard}>
            <Grid item md={12} style={{ padding: 10 }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                پاسخ برگ آزمون
              </Typography>
            </Grid>
            <AnswerCard dataOffline={dataOffline} examId={examId} />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};
export default PdfQuiz;
