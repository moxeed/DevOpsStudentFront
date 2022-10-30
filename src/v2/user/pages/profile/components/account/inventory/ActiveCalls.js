import * as React from "react";
import { Grid } from "@mui/material";
import ConsultInventoryCard from "./cards/ConsultInventoryCard";

const ActiveCalls = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(5)].map((i, index) => (
        <Grid item xs={12} md={4} key={"activeExams_" + index}>
          <ConsultInventoryCard item={{ name: "تماس دقیقه ای" }} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ActiveCalls;
