import { Grid } from "@mui/material";
import * as React from "react";
import ProductInventoryCard from "./cards/ProductInventoryCard";

const ActiveTutorings = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(5)].map((i, index) => (
        <Grid item xs={12} md={4} key={"activeTutoring_" + index}>
          <ProductInventoryCard item={{ name: "تدریس خصوصی" }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveTutorings;
