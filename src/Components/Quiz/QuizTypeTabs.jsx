import React from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, Typography } from "@material-ui/core";

const QuizTypeTabs = ({ handleOnlineQuiz, handlePdfQize, step, mode }) => {
  return (
    <Grid
      container
      style={{
        backgroundColor: "white",
        padding: 20,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        md={4}
        sm={12}
        xs={12}
        style={{ textAlign: "center", paddingTop: 10 }}
      >
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          نحوه آزمون خود را انتخاب کنید :
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        sm={6}
        xs={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className={
            "Btn-tab" +
            (step === 1 ? " active" : " ") +
            (mode !== "2" && mode !== "1" ? "disabled" : '')
          }
          onClick={handleOnlineQuiz}
          disabled={mode !== "2" && mode !== "1" ? true : false}
        >
          آزمون به صورت آنلاین
        </button>
       
      </Grid>
      <Grid
        item
        md={4}
        sm={6}
        xs={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className={
            "Btn-tab" +
            (step === 0 ? " active" : " ") +
            (mode !== "2" && mode !== "0" ? "disabled" : '')
          }
          onClick={handlePdfQize}
          disabled={mode !== "2" && mode !== "0" ? true : false}
        >
          آزمون به صورت pdf
        </button>
        
      </Grid>

      <Grid>
        {" "}
        <Divider variant="middle" />
      </Grid>
    </Grid>
  );
};

export default QuizTypeTabs;
