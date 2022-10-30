import { Grid } from "@mui/material";
import * as React from "react";
import ProductInventoryCard from "./cards/ProductInventoryCard";

const ActiveWebinar = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(5)].map((i, index) => (
        <Grid item xs={12} md={4} key={"activeWebinar_" + index}>
          <ProductInventoryCard item={{ name: "همایش" }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveWebinar;
