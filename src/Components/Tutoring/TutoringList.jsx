import React from "react";
import Grid from "@material-ui/core/Grid";
import NoResult from "../Reusable/NoResult";
import TutoringCard from "src/v2/components/reusable/cards/TutoringCard/TutoringCard";

export default function TouringList({ sortedData, minValue, maxValue }) {
  return (
    <>
      {sortedData && sortedData.length > 0 ? (
        sortedData.slice(minValue, maxValue).map((p, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            xl={3}
            container
            justifyContent="center"
            key={i}
            style={{ textAlign: "center", marginBottom: 4 }}
          >
            <TutoringCard item={p} />
          </Grid>
        ))
      ) : (
        <NoResult />
      )}
    </>
  );
}
