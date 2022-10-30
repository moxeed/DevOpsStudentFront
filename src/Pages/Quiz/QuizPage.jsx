import React from "react";
import { Grid } from "@material-ui/core";
import QuizHandler from "../../Components/Quiz/QuizHandler";

const QuizPage = ({ isOffline }) => {
  return (
    <Grid container justifyContent="center">
      <QuizHandler isOffline={isOffline} />
    </Grid>
  );
};

export default QuizPage;
