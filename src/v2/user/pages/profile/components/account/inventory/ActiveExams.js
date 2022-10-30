import { Grid } from "@mui/material";
import * as React from "react";
import ExamInventoryCard from "./cards/ExamInventoryCard.";

const ActiveExams = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(5)].map((i, index) => (
        <Grid item xs={12} md={4} key={"activeExams_" + index}>
          <ExamInventoryCard item={{ name: "آزمون" }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveExams;
