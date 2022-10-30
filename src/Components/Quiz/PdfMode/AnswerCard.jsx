import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardPdfQuiz from "./CardPdfQuiz";

const useStyles = makeStyles(() => ({
  root: {
    direction: "ltr",
  },
  styleCardPdf: {
    border: "1px solid #43BF46",
    width: "100%",
  },
}));
const PdfQuiz = ({ examId, dataOffline }) => {
  const classes = useStyles();

  return (
    <>
      {dataOffline
        ? [...Array(Math.ceil(dataOffline.numOfQuestion / 30))].map(
            (_, index) => (
              <Grid container key={index}>
                <Grid item xs={4} className={classes.styleCardPdf}>
                  <CardPdfQuiz
                    number={index * 30 + 21}
                    dataOffline={dataOffline}
                    examId={examId}
                  />
                </Grid>
                <Grid item xs={4} className={classes.styleCardPdf}>
                  <CardPdfQuiz
                    number={index * 30 + 11}
                    dataOffline={dataOffline}
                    examId={examId}
                  />
                </Grid>
                <Grid item xs={4} className={classes.styleCardPdf}>
                  <CardPdfQuiz
                    number={index * 30 + 1}
                    dataOffline={dataOffline}
                    examId={examId}
                  />
                </Grid>
              </Grid>
            )
          )
        : null}
    </>
  );
};

export default PdfQuiz;
